import { IysConsent } from './iys-consent';

/**
 * Interface representing an IYS consent.
 */
export interface IysConsentReportItem extends IysConsent {
  /**
   * Consent request status
   */
  request_status: string;
}
