/**
 * Shared shape for the inquiry form state.
 *
 * This lives outside `app/actions.ts` on purpose: a `"use server"` module may
 * only export async functions, so a constant exported from there arrives as
 * `undefined` on the client.
 */
export interface InquiryState {
  status: "idle" | "success" | "error";
  message: string;
  errors: Partial<Record<"name" | "email" | "phone" | "message", string>>;
  /** Echoed back so the form can repopulate after a failed submit. */
  values: Record<string, string>;
}

export const EMPTY_INQUIRY: InquiryState = {
  status: "idle",
  message: "",
  errors: {},
  values: {},
};
