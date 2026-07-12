/**
 * Analytics hooks (no provider connected yet).
 * Wire these to your analytics SDK during a later phase.
 */

type Payload = Record<string, unknown>;

function track(event: string, payload: Payload = {}) {
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.info(`[analytics:ready] ${event}`, payload);
  }
}

export const analytics = {
  assessmentStarted: (payload?: Payload) => track("Assessment Started", payload),
  questionAnswered: (payload: Payload) => track("Question Answered", payload),
  assessmentCompleted: (payload: Payload) => track("Assessment Completed", payload),
  programRecommended: (payload: Payload) => track("Program Recommended", payload),
  membershipRecommended: (payload: Payload) => track("Membership Recommended", payload),
  bookConsultationClicked: (payload?: Payload) => track("Book Consultation Clicked", payload),
  leadCaptured: (payload: Payload) => track("Lead Captured", payload),
};
