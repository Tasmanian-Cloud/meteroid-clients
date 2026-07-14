import { Webhook as StandardWebhook } from "standardwebhooks";

export interface WebhookOptions {
  /** Raw signing secret. If your secret is prefixed with `whsec_`, strip it before passing it here. */
  secret: string;
}

export class Webhook {
  private readonly verifier: StandardWebhook;

  constructor(options: WebhookOptions) {
    this.verifier = new StandardWebhook(options.secret);
  }

  /**
   * Verify and parse a Meteroid webhook payload.
   *
   * @param payload Raw request body as a string.
   * @param headers Request headers. Keys are case-insensitive.
   * @returns Parsed JSON payload.
   * @throws Error if the signature is invalid or the timestamp is outside tolerance.
   */
  verify(payload: string, headers: Record<string, string | string[] | undefined>): unknown {
    const normalized: Record<string, string> = {};
    for (const [key, value] of Object.entries(headers)) {
      if (typeof value === "string") {
        normalized[key.toLowerCase()] = value;
      }
    }
    return this.verifier.verify(payload, normalized);
  }
}
