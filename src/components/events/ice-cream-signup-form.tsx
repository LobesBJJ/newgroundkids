"use client";

import { useActionState, useState } from "react";
import { CheckCircle2, Loader2, MailCheck } from "lucide-react";

import { signUpForIceCreamSocial, type SignupState } from "@/app/actions/ice-cream-social";

const navy = "#1D3557";
const red = "#E63946";
const redText = "#B8202E";
const cyan = "#A8DADC";
const honeydew = "#F1FAEE";
const steel = "#457B9D";

function Field({
  name,
  label,
  type = "text",
  required = true,
  autoComplete,
  inputMode,
  placeholder,
  state,
  className,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  placeholder?: string;
  state: SignupState | null;
  className?: string;
}) {
  const error = state?.errors?.[name];
  const id = `ics-${name}`;
  return (
    <div className={`flex min-w-0 flex-col gap-1.5 ${className ?? ""}`}>
      <label htmlFor={id} className="text-sm font-semibold" style={{ color: navy }}>
        {label}
        {required ? (
          <span aria-hidden style={{ color: redText }}>
            {" "}
            *
          </span>
        ) : (
          <span className="font-normal" style={{ color: steel }}>
            {" "}
            (optional)
          </span>
        )}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder={placeholder}
        defaultValue={state?.values?.[name] ?? ""}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className="h-12 w-full rounded-lg border-2 bg-white px-3.5 text-base outline-none transition-colors focus:border-[#457B9D]"
        style={{ borderColor: error ? red : "#CFE0E1", color: navy }}
      />
      {error && (
        <p id={`${id}-error`} className="text-sm font-medium" style={{ color: redText }}>
          {error}
        </p>
      )}
    </div>
  );
}

function Group({ step, title, note, children }: { step: number; title: string; note?: string; children: React.ReactNode }) {
  return (
    <fieldset className="rounded-2xl border-2 p-5 md:p-6" style={{ borderColor: "#CFE0E1", backgroundColor: honeydew }}>
      <legend className="flex items-center gap-3 px-2">
        <span
          className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white"
          style={{ backgroundColor: navy }}
        >
          {step}
        </span>
        <span className="text-lg font-bold" style={{ color: navy }}>
          {title}
        </span>
      </legend>
      {note && (
        <p className="mb-4 text-sm" style={{ color: steel }}>
          {note}
        </p>
      )}
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

export function IceCreamSignupForm({ full = false }: { full?: boolean }) {
  const [formKey, setFormKey] = useState(0);
  return <SignupFormInner key={formKey} full={full} onReset={() => setFormKey((k) => k + 1)} />;
}

function SignupFormInner({ full, onReset }: { full: boolean; onReset: () => void }) {
  const [state, action, pending] = useActionState(signUpForIceCreamSocial, null);

  if (state?.success && state.sentTo) {
    return (
      <div
        className="rounded-3xl border-4 bg-white p-8 text-center shadow-[0_18px_40px_rgba(29,53,87,0.18)] md:p-10"
        style={{ borderColor: cyan }}
        role="status"
      >
        <CheckCircle2 className="mx-auto mb-4 h-14 w-14" style={{ color: red }} aria-hidden />
        <h3 className="text-3xl font-bold normal-case tracking-normal md:text-4xl" style={{ color: navy, fontFamily: "inherit" }}>
          {full
            ? `${state.friend ?? "Your friend"} is on the waitlist`
            : state.friend
              ? `${state.friend} is on the list!`
              : "You're on the list!"}
        </h3>
        <div
          className="mx-auto mt-5 flex max-w-md items-start gap-3 rounded-xl p-4 text-left"
          style={{ backgroundColor: honeydew }}
        >
          <MailCheck className="mt-0.5 h-6 w-6 shrink-0" style={{ color: steel }} aria-hidden />
          <p style={{ color: navy }}>
            {full ? (
              <>
                We emailed <strong className="break-all">{state.sentTo}</strong>. If a spot opens up, we&apos;ll send the
                waiver link right away.
              </>
            ) : (
              <>
                We just emailed <strong className="break-all">{state.sentTo}</strong>. Their parent signs the waiver
                on their phone in about 2 minutes.
              </>
            )}
          </p>
        </div>
        {!full && (
          <p className="mt-5" style={{ color: navy }}>
            See you Saturday, January 23 at 2 PM. Check in at the front desk when you arrive.
          </p>
        )}
        <button
          type="button"
          onClick={onReset}
          className="mt-7 inline-flex h-12 items-center justify-center rounded-full border-2 px-6 font-semibold transition-colors hover:bg-[#F1FAEE]"
          style={{ borderColor: navy, color: navy }}
        >
          Bringing another friend? Sign them up too
        </button>
      </div>
    );
  }

  return (
    <form
      action={action}
      noValidate
      className="rounded-3xl bg-white p-5 shadow-[0_18px_40px_rgba(29,53,87,0.18)] md:p-8"
    >
      <div className="flex flex-col gap-6">
        <Group step={1} title="Your New Ground student">
          <Field name="student_first" label="First name" autoComplete="off" state={state} />
          <Field name="student_last" label="Last name" autoComplete="off" state={state} />
        </Group>

        <Group step={2} title="The friend you're bringing" note="Someone who doesn't train jiu jitsu yet.">
          <Field name="friend_first" label="First name" autoComplete="off" state={state} />
          <Field name="friend_last" label="Last name" autoComplete="off" state={state} />
          <Field
            name="friend_age"
            label="Age"
            type="number"
            inputMode="numeric"
            autoComplete="off"
            state={state}
            className="sm:col-span-1"
          />
        </Group>

        <Group
          step={3}
          title="Your friend's parent or guardian"
          note="We email the waiver link to this parent. They sign it on their phone before the event."
        >
          <Field name="parent_first" label="First name" autoComplete="off" state={state} />
          <Field name="parent_last" label="Last name" required={false} autoComplete="off" state={state} />
          <Field
            name="parent_email"
            label="Email"
            type="email"
            inputMode="email"
            autoComplete="off"
            placeholder="parent@email.com"
            state={state}
          />
          <Field
            name="parent_phone"
            label="Phone"
            type="tel"
            inputMode="tel"
            autoComplete="off"
            placeholder="(818) 555-0123"
            state={state}
          />
        </Group>

        {/* Honeypot — hidden from people, tempting to bots */}
        <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor="ics-company">Company</label>
          <input id="ics-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        {state && !state.success && (
          <p
            className="rounded-xl border-2 p-4 text-sm font-medium"
            style={{ borderColor: red, color: redText, backgroundColor: "#FDECEE" }}
            role="alert"
          >
            {state.message}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full text-lg font-bold tracking-wide text-white uppercase transition-transform hover:scale-[1.01] disabled:opacity-70 sm:h-16"
          style={{ backgroundColor: red, boxShadow: "0 10px 30px rgba(230,57,70,0.35)" }}
        >
          {pending ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> Signing up…
            </>
          ) : (
            full ? "Join the waitlist" : "Sign up my friend"
          )}
        </button>
        <p className="text-center text-sm" style={{ color: steel }}>
          {full
            ? "All 25 spots are taken. Join the waitlist and we'll email you if a spot opens."
            : "Free. Limited to 25 friends. 1 friend per sign-up; bringing 2? Send this form twice."}
        </p>
      </div>
    </form>
  );
}
