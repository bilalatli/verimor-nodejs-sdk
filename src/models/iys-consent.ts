import { IysConsentType } from '../enums/iys-consent-type';
import { IysConsentSource } from '../enums/iys-consent-source';
import { IysConsentStatus } from '../enums/iys-consent-status';
import { IysRecipientType } from '../enums/iys-recipient-type';

/**
 * Interface representing an IYS consent.
 */
export interface IysConsent {
  /** Communication channel type ("ARAMA", "MESAJ", "EPOSTA"). */
  type: IysConsentType;
  /** Source of consent. */
  source: IysConsentSource;
  /** Consent status ("ONAY", "RET"). */
  status: IysConsentStatus;
  /** Recipient type ("BIREYSEL", "TACIR"). */
  recipient_type: IysRecipientType;
  /** Date of consent (ISO 8601 format). */
  consent_date: string;
  /** Recipient phone number or email address. */
  recipient: string;
}
