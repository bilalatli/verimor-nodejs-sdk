/**
 * Interface representing a blacklisted number.
 */
export interface BlacklistNumber {
  /** Creation timestamp. */
  created_at: string;
  /** Blacklisted phone number. */
  phone: string;
  /** Source of the blacklist entry. */
  source: string;
}
