import { BaseApi } from './base-api';
import { BlacklistNumber } from '../models/blacklist-number';
import { ErrorResponse } from '../models/error-response';
import { ProxyConfig } from '../models/proxy-config';

/**
 * BlacklistApi class provides methods to manage blacklisted numbers.
 */
export class BlacklistApi extends BaseApi {
  /**
   * Creates an instance of BlacklistApi.
   * @param username - The API username.
   * @param password - The API password.
   * @param proxyConfig - Optional proxy configuration.
   */
  constructor(username: string, password: string, proxyConfig?: ProxyConfig) {
    super(username, password, proxyConfig);
  }

  /**
   * Retrieves blacklisted numbers.
   * @param offset - The offset for pagination.
   * @param limit - The number of records to retrieve (max 100).
   * @returns Promise resolving to an object containing total and records.
   * @throws ErrorResponse if the API call fails.
   */
  public async getBlacklistedNumbers(
    offset = 0,
    limit = 100
  ): Promise<{ total: number; records: BlacklistNumber[] }> {
    try {
      const params = this.withCredentialsParams({ offset, limit });
      const response = await this.apiClient.get<{ total: number; records: BlacklistNumber[] }>(
        '/blacklists',
        {
          params,
        }
      );
      return response.data;
    } catch (error: any) {
      throw new ErrorResponse(error.response?.data || error.message);
    }
  }

  /**
   * Adds numbers to the blacklist.
   * @param phones - Array of phone numbers to blacklist.
   * @returns Promise resolving to a success message.
   * @throws ErrorResponse if the API call fails.
   */
  public async addNumbersToBlacklist(phones: string[]): Promise<string> {
    try {
      const params = this.withCredentialsParams({ phones: phones.join(',') });
      const response = await this.apiClient.post<string>('/blacklists', null, {
        params,
      });
      return response.data;
    } catch (error: any) {
      throw new ErrorResponse(error.response?.data || error.message);
    }
  }

  /**
   * Removes numbers from the blacklist.
   * @param phones - Array of phone numbers to remove from blacklist.
   * @returns Promise resolving to a success message.
   * @throws ErrorResponse if the API call fails.
   */
  public async deleteNumbersFromBlacklist(phones: string[]): Promise<string> {
    try {
      const params = this.withCredentialsParams({});
      const response = await this.apiClient.delete<string>(
        `/blacklists/${phones.join(',')}`,
        { params }
      );
      return response.data;
    } catch (error: any) {
      throw new ErrorResponse(error.response?.data || error.message);
    }
  }
}
