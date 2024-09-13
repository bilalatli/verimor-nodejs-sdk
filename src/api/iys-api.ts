import { BaseApi } from './base-api';
import { IysConsent } from '../models/iys-consent';
import { IysCampaign } from '../models/iys-campaign';
import { ErrorResponse } from '../models/error-response';
import { ProxyConfig } from '../models/proxy-config';

/**
 * IysApi class provides methods for IYS integration.
 */
export class IysApi extends BaseApi {
  /**
   * Creates an instance of IysApi.
   * @param username - The API username.
   * @param password - The API password.
   * @param proxyConfig - Optional proxy configuration.
   */
  constructor(username: string, password: string, proxyConfig?: ProxyConfig) {
    super(username, password, proxyConfig);
  }

  /**
   * Sends IYS consents.
   * @param sourceAddr - The sender ID.
   * @param consents - Array of IysConsent objects.
   * @returns Promise resolving to a campaign ID.
   * @throws ErrorResponse if the API call fails.
   */
  public async sendIysConsents(sourceAddr: string, consents: IysConsent[]): Promise<number> {
    try {
      const payload = this.withCredentials({
        source_addr: sourceAddr,
        consents: consents,
      });
      const response = await this.apiClient.post<number>('/iys_consents.json', payload);
      return response.data;
    } catch (error: any) {
      throw new ErrorResponse(error.response?.data || error.message);
    }
  }

  /**
   * Fetches IYS campaigns.
   * @param offset - Pagination offset.
   * @param limit - Number of records to retrieve.
   * @param source - Filter by source (e.g., 'iys', 'api').
   * @returns Promise resolving to an object containing total and records.
   * @throws ErrorResponse if the API call fails.
   */
  public async getIysCampaigns(
    offset = 0,
    limit = 100,
    source?: string,
  ): Promise<{ total: number; records: IysCampaign[] }> {
    try {
      const params = this.withCredentialsParams({ offset, limit, source });
      const response = await this.apiClient.get<{ total: number; records: IysCampaign[] }>(
        '/iys/campaigns',
        { params },
      );
      return response.data;
    } catch (error: any) {
      throw new ErrorResponse(error.response?.data || error.message);
    }
  }

  /**
   * Fetches IYS consent reports for a campaign.
   * @param campaignId - The IYS campaign ID.
   * @param offset - Pagination offset.
   * @param limit - Number of records to retrieve.
   * @returns Promise resolving to consent report data.
   * @throws ErrorResponse if the API call fails.
   */
  public async getIysConsentReports(
    campaignId: number,
    offset = 0,
    limit = 100,
  ): Promise<any> {
    try {
      const params = this.withCredentialsParams({ offset, limit });
      const response = await this.apiClient.get<any>(`/iys/campaigns/${campaignId}/consents`, {
        params,
      });
      return response.data;
    } catch (error: any) {
      throw new ErrorResponse(error.response?.data || error.message);
    }
  }
}
