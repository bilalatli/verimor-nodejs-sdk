/**
 * Interface representing an SMS response from the API.
 */
export interface SmsResponse {
  /** Status of the SMS request. */
  status?: string;
  /** Unique message ID assigned by the API. */
  message_id?: string;
  /** Campaign ID returned by the API. */
  campaign_id?: number;
  /** List of invalid phone numbers, if any. */
  invalid_numbers?: string[];
}
