/**
 * Interface representing a sender ID.
 */
export interface SenderId {
  /** The sender ID string. */
  sender: string;
  /** Status of the sender ID (e.g., "ACTIVE", "PENDING"). */
  status: string;
  /** Date when the sender ID was added or updated. */
  date: string;
}
