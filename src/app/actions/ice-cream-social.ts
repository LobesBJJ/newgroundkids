"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { checkRateLimit } from "@/lib/rate-limit";

// Zapier workflow "ice-cream-social-signup": adds the friend to the ClickUp roster
// "Ice Cream Social · Jan 23, 2027" (waiver is signed in person at check-in).
const SIGNUP_HOOK = "https://hooks.zapier.com/hooks/catch/26294258/0zHO1aOskovhpPGG/";

const name = (label: string) =>
  z
    .string()
    .trim()
    .min(1, `${label} is required`)
    .max(60, `${label} is too long`);

const signupSchema = z.object({
  student_first: name("Student's first name"),
  student_last: name("Student's last name"),
  friend_first: name("Friend's first name"),
  friend_last: name("Friend's last name"),
  friend_age: z.coerce
    .number({ message: "Friend's age is required" })
    .int("Enter a whole number")
    .min(3, "Enter an age from 3 to 17")
    .max(17, "Enter an age from 3 to 17"),
  parent_first: name("Parent's first name"),
  parent_last: z.string().trim().max(60).optional(),
  parent_email: z.string().trim().toLowerCase().email("Enter a valid email address"),
  parent_phone: z
    .string()
    .trim()
    .refine((v) => {
      const d = v.replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "");
      return d.length === 10;
    }, "Enter a 10-digit phone number"),
});

export interface SignupState {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
  values?: Record<string, string>;
  sentTo?: string;
  friend?: string;
}

const FIELDS = [
  "student_first",
  "student_last",
  "friend_first",
  "friend_last",
  "friend_age",
  "parent_first",
  "parent_last",
  "parent_email",
  "parent_phone",
] as const;

export async function signUpForIceCreamSocial(
  _prev: SignupState | null,
  formData: FormData
): Promise<SignupState> {
  const values: Record<string, string> = {};
  for (const f of FIELDS) values[f] = String(formData.get(f) ?? "");

  // Honeypot: real people never see or fill this field
  if (String(formData.get("company") ?? "").trim() !== "") {
    return { success: true, message: "Thanks!", values: {} };
  }

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  const limit = checkRateLimit(`ice-cream:${ip}`, { limit: 8, windowSeconds: 600 });
  if (!limit.allowed) {
    return {
      success: false,
      message: `Too many sign-ups from this device. Try again in ${limit.resetIn} seconds.`,
      values,
    };
  }

  const parsed = signupSchema.safeParse(values);
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0]);
      if (!errors[key]) errors[key] = issue.message;
    }
    return { success: false, message: "Please fix the highlighted fields.", errors, values };
  }

  const d = parsed.data;
  try {
    const res = await fetch(SIGNUP_HOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "ice_cream_social",
        ...d,
        friend_age: String(d.friend_age),
        parent_last: d.parent_last ?? "",
        submitted_at: new Date().toISOString(),
      }),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Hook returned ${res.status}`);
  } catch (error) {
    console.error("Ice Cream Social sign-up failed:", error);
    return {
      success: false,
      message:
        "Something went wrong on our end and your sign-up didn't go through. Please try again, or text us at (818) 538-4989.",
      values,
    };
  }

  return {
    success: true,
    message: "You're on the list!",
    sentTo: d.parent_email,
    friend: d.friend_first,
    values: {},
  };
}
