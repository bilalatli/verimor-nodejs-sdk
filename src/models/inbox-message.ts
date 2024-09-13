/**
 * Interface representing an inbox message.
 */
export interface InboxMessage {
  /** The message ID. */
  message_id: number;
  /** Creation timestamp. */
  created_at: string;
  /** Network operator (e.g., "TURKCELL"). */
  network: string;
  /** Sender's phone number. */
  source_addr: string;
  /** Destination address (your number or short code). */
  destination_addr: string;
  /** Keyword if applicable. */
  keyword: string;
  /** Message content. */
  content: string;
  /** Received timestamp. */
  received_at: string;
}
