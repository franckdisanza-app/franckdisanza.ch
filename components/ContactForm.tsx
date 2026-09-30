'use client';

import { useState } from 'react';

import type { Content } from '@/lib/content';

type Form = Content['sponsor']['form'];

/**
 * Endpoint Formspree. L'identifiant du formulaire est public par nature (il
 * voyage dans le navigateur du visiteur), il vit donc dans le code — rien à
 * configurer sur Vercel. La variable d'environnement permet de le remplacer
 * sans toucher au code ; s'il est vidé, le formulaire retombe sur un envoi par
 * client mail.
 */
const ENDPOINT =
  process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? 'https://formspree.io/f/mdenraeq';

type Status = 'idle' | 'sending' | 'sent' | 'mailto' | 'error';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Le formulaire est posé sur fond noir : champs transparents, bordures claires.
// 16 px sur mobile : en dessous, Safari iOS zoome sur le champ à la saisie.
const inputClass =
  'w-full rounded-[2px] border border-blanc/20 bg-blanc/5 px-4 py-3 text-base text-blanc placeholder:text-gris-moyen transition-colors focus:border-blanc focus:bg-blanc/10 focus:outline-none md:text-sm';

export default function ContactForm({ form: f, email: contactEmail }: { form: Form; email: string }) {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Piège à robots : rempli uniquement par les scripts.
    if (data.get('_gotcha')) return;

    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();
    const company = String(data.get('company') ?? '').trim();

    if (!name || !email || !message) {
      setStatus('error');
      setError(f.requiredError);
      return;
    }

    if (!EMAIL_RE.test(email)) {
      setStatus('error');
      setError(f.emailError);
      return;
    }

    setError('');

    // Sujet dans la langue du visiteur : on sait d'un coup d'œil dans quelle
    // langue répondre (« Partenariat », « Partnership », « Partnerschaft »).
    const subject = `${f.subject} — ${name}${company ? ` (${company})` : ''}`;

    if (!ENDPOINT) {
      const body = [
        `${f.fields.name.label}: ${name}`,
        `${f.fields.company.label}: ${company || '—'}`,
        `${f.fields.email.label}: ${email}`,
        '',
        message,
      ].join('\n');
      setStatus('mailto');
      window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus('sending');
    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name,
          company: company || '—',
          email,
          message,
          _subject: subject,
        }),
      });
      if (!response.ok) throw new Error(String(response.status));
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
      setError(f.errorText);
    }
  }

  if (status === 'sent') {
    return (
      <div className="border-l-2 border-rouge bg-blanc/5 p-8">
        <p className="font-display text-xl font-extrabold uppercase text-blanc">{f.successTitle}</p>
        <p className="mt-3 text-sm text-gris-clair">{f.successText}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <p aria-hidden="true" className="hidden">
        <label>
          Ne pas remplir
          <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      {/* Nom et entreprise côte à côte quand la place le permet. Entre 1024 et
          1280 px, le formulaire partage la largeur avec le texte : on empile. */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        <Field id="name" label={f.fields.name.label} requiredLabel={f.required}>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder={f.fields.name.placeholder}
            className={inputClass}
          />
        </Field>

        <Field id="company" label={f.fields.company.label}>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder={f.fields.company.placeholder}
            className={inputClass}
          />
        </Field>
      </div>

      <Field id="email" label={f.fields.email.label} requiredLabel={f.required}>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={f.fields.email.placeholder}
          className={inputClass}
        />
      </Field>

      <Field id="message" label={f.fields.message.label} requiredLabel={f.required}>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder={f.fields.message.placeholder}
          className={`${inputClass} resize-y`}
        />
      </Field>

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
          {status === 'sending' ? f.submitting : f.submit}
        </button>
        <a
          href={`mailto:${contactEmail}`}
          className="selectable text-sm text-gris-moyen underline-offset-4 transition-colors hover:text-blanc hover:underline"
        >
          {contactEmail}
        </a>
      </div>

      <p role="status" aria-live="polite" className="min-h-5 text-sm">
        {status === 'error' && <span className="text-rouge">{error}</span>}
        {status === 'mailto' && <span className="text-gris-clair">{f.mailtoNotice}</span>}
      </p>
    </form>
  );
}

/** Champ avec libellé ; `requiredLabel` marque le champ obligatoire d'une étoile. */
function Field({
  id,
  label,
  requiredLabel,
  children,
}: {
  id: string;
  label: string;
  requiredLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.14em] text-gris-moyen"
      >
        {label}
        {requiredLabel && (
          <span className="ml-1 text-rouge" title={requiredLabel}>
            *
          </span>
        )}
      </label>
      {children}
    </div>
  );
}
