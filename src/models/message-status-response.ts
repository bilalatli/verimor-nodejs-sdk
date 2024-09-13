/**
 * Interface representing the message status response.
 */
export interface MessageStatusResponse {
  /** The campaign ID. */
  campaign_id: number;
  /** Custom ID of the campaign. */
  campaign_custom_id?: string;
  /** Message ID assigned by the API. */
  message_id: number;
  /** Custom ID of the message. */
  message_custom_id?: string;
  /** Destination phone number. */
  dest: string;
  /** Size of the message. */
  size: number;
  /** International multiplier. */
  international_multiplier: number;
  /** Number of credits used. */
  credits: number;
  /** Status of the message (e.g., "DELIVERED", "FAILED"). */
  status: string;
  /** GSM error code, if any. */
  gsm_error?: string;
  /** Sent timestamp. */
  sent_at?: string;
  /** Done timestamp. */
  done_at?: string;
}
