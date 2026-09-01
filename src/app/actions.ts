"use server";

import type { InquiryState } from "@/lib/inquiry";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function field(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

/**
 * Handles both the site-wide contact form and the per-property inquiry form.
 *
 * NOTE: this validates and records the lead but does not yet deliver it
 * anywhere. Wiring the delivery step is a single call at the marked line —
 * Resend, SendGrid, a CRM webhook, or an insert into a database.
 */
export async function submitInquiry(
  _previous: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  const values = {
    name: field(formData, "name"),
    email: field(formData, "email"),
    phone: field(formData, "phone"),
    message: field(formData, "message"),
    property: field(formData, "property"),
  };

  const errors: InquiryState["errors"] = {};

  if (values.name.length < 2) {
    errors.name = "Please enter your name.";
  }
  if (!EMAIL_PATTERN.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (values.phone && values.phone.replace(/[^\d]/g, "").length < 7) {
    errors.phone = "That phone number looks too short.";
  }
  if (values.message.length < 10) {
    errors.message = "Please tell us a little more — at least 10 characters.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please check the highlighted fields and try again.",
      errors,
      values,
    };
  }

  // Deliberate small delay so the pending state is visible in the demo.
  await new Promise((resolve) => setTimeout(resolve, 600));

  // >>> Delivery step goes here (email provider / CRM / database insert).
  console.info("[inquiry]", {
    ...values,
    receivedAt: new Date().toISOString(),
  });

  return {
    status: "success",
    message: values.property
      ? `Thanks ${values.name.split(" ")[0]} — your enquiry about ${values.property} is with us. An advisor will reply within one working day.`
      : `Thanks ${values.name.split(" ")[0]} — your message is with us. We will reply within one working day.`,
    errors: {},
    values: {},
  };
}
