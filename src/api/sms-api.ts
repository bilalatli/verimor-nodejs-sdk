import { BaseApi } from './base-api';
import { SmsRequest } from '../models/sms-request';
import { SmsResponse } from '../models/sms-response';
import { ErrorResponse } from '../models/error-response';
import { SmsUtils } from '../utils/sms-utils';
import { ProxyConfig } from '../models/proxy-config';

/**
 * SmsApi class provides methods to interact with the SMS API.
 */
export class SmsApi extends BaseApi {
  /**
   * Creates an instance of SmsApi.
   * @param username - The API username.
   * @param password - The API password.
   * @param proxyConfig - Optional proxy configuration.
   */
  constructor(username: string, password: string, proxyConfig?: ProxyConfig) {
    super(username, password, proxyConfig);
  }

  /**
   * Sends SMS messages (single or multiple).
   * @param smsRequest - The SMS request payload.
   * @returns Promise resolving to SmsResponse.
   * @throws ErrorResponse if the API call fails.
   */
  public async sendSms(smsRequest: SmsRequest): Promise<SmsResponse> {
    try {
      // Include credentials in the request body
      const data = this.withCredentials(smsRequest);
      const response = await this.apiClient.post<SmsResponse>('/send.json', data);
      return response.data;
    } catch (error: any) {
      throw new ErrorResponse(error.response?.data || error.message);
    }
  }

  /**
   * Cancels a scheduled SMS campaign.
   * @param campaignId - The ID of the campaign to cancel.
   * @returns Promise resolving to a success message.
   * @throws ErrorResponse if the API call fails.
   */
  public async cancelScheduledMessage(campaignId: number): Promise<string> {
    try {
      // Include credentials in the request body
      const data = this.withCredentials({});
      const response = await this.apiClient.post<string>(`/cancel/${campaignId}`, data);
      return response.data;
    } catch (error: any) {
      throw new ErrorResponse(error.response?.data || error.message);
    }
  }

  /**
   * Calculates the number of SMS credits required for the given message.
   * @param message - The message content.
   * @returns The number of SMS credits required.
   */
  public calculateSmsCredits(message: string): number {
    return SmsUtils.calculateSmsCredits(message);
  }
}
