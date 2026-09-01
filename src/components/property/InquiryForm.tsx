"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { CheckCircle2, Send } from "lucide-react";
import { submitInquiry } from "@/app/actions";
import { EMPTY_INQUIRY } from "@/lib/inquiry";
import { cn } from "@/lib/cn";

const fieldClass =
  "rounded-xl border border-hairline bg-transparent px-4 py-3 font-body text-sm text-paper outline-none transition-colors focus:border-ember";

const labelClass =
  "font-body text-xs uppercase tracking-[0.1em] text-paper/40";

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 inline-flex items-center gap-2 self-start rounded-full bg-ember px-6 py-3 font-body text-[13px] uppercase tracking-[0.14em] text-ink transition-colors hover:bg-ember-glow disabled:cursor-not-allowed disabled:opacity-60"
    >
      <Send className="h-4 w-4" strokeWidth={1.75} />
      {pending ? "Sending…" : label}
    </button>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <span role="alert" className="font-body text-xs text-ember-glow">
      {message}
    </span>
  );
}

export function InquiryForm({
  propertyName,
  heading = "Send us a message",
  submitLabel = "Send Message",
  className,
}: {
  propertyName?: string;
  heading?: string;
  submitLabel?: string;
  className?: string;
}) {
  const [state, formAction] = useActionState(submitInquiry, EMPTY_INQUIRY);

  if (state.status === "success") {
    return (
      <div
        className={cn(
          "flex flex-col items-start justify-center gap-4 p-10",
          className,
        )}
      >
        <CheckCircle2
          className="h-8 w-8 text-ember-glow"
          strokeWidth={1.5}
          aria-hidden="true"
        />
        <p
          role="status"
          className="max-w-sm font-display text-xl font-semibold leading-snug text-paper"
        >
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className={cn("flex flex-col gap-5", className)}>
      <p className="font-body text-sm uppercase tracking-[0.14em] text-paper/50">
        {heading}
      </p>

      {propertyName && (
        <input type="hidden" name="property" value={propertyName} />
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className={labelClass}>Your Name</span>
          <input
            type="text"
            name="name"
            required
            defaultValue={state.values.name}
            aria-invalid={Boolean(state.errors.name)}
            className={cn(fieldClass, state.errors.name && "border-ember")}
            placeholder="Anna Lund"
          />
          <FieldError message={state.errors.name} />
        </label>

        <label className="flex flex-col gap-2">
          <span className={labelClass}>Email</span>
          <input
            type="email"
            name="email"
            required
            defaultValue={state.values.email}
            aria-invalid={Boolean(state.errors.email)}
            className={cn(fieldClass, state.errors.email && "border-ember")}
            placeholder="anna@email.com"
          />
          <FieldError message={state.errors.email} />
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className={labelClass}>Phone (optional)</span>
        <input
          type="tel"
          name="phone"
          defaultValue={state.values.phone}
          aria-invalid={Boolean(state.errors.phone)}
          className={cn(fieldClass, state.errors.phone && "border-ember")}
          placeholder="+47 000 00 000"
        />
        <FieldError message={state.errors.phone} />
      </label>

      <label className="flex flex-col gap-2">
        <span className={labelClass}>Message</span>
        <textarea
          name="message"
          rows={4}
          required
          defaultValue={state.values.message}
          aria-invalid={Boolean(state.errors.message)}
          className={cn(
            fieldClass,
            "resize-none",
            state.errors.message && "border-ember",
          )}
          placeholder={
            propertyName
              ? `I would like to arrange a viewing of ${propertyName}…`
              : "Tell us about your project…"
          }
        />
        <FieldError message={state.errors.message} />
      </label>

      {state.status === "error" && (
        <p role="alert" className="font-body text-sm text-ember-glow">
          {state.message}
        </p>
      )}

      <SubmitButton label={submitLabel} />
    </form>
  );
}
