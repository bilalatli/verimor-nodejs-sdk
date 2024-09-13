import { RecipientType } from '../enums/recipient-type';

/**
 * Interface representing an SMS request payload.
 */
export interface SmsRequest {
  /** The message content. */
  msg: string;
  /** Array of destination phone numbers. */
  dest: string[];
  /** The sender ID. */
  source_addr?: string;
  /** Scheduled start time (ISO 8601 format). */
  send_at?: string;
  /** Expiration time (in S:DD format, e.g., "24:00"). */
  valid_for?: string;
  /** Custom ID for the campaign. */
  custom_id?: string;
  /** Data coding scheme. */
  datacoding?: string;
  /** Whether to apply IYS filter. */
  is_commercial?: boolean;
  /** Recipient type for IYS ("BIREYSEL" or "TACIR"). */
  iys_recipient_type?: RecipientType;
}
