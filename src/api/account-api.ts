import { BaseApi } from './base-api';
import { ErrorResponse } from '../models/error-response';
import { ProxyConfig } from '../models/proxy-config';

/**
 * AccountApi class provides methods to interact with account-related endpoints.
 */
export class AccountApi extends BaseApi {
  /**
   * Creates an instance of AccountApi.
   * @param username - The API username.
   * @param password - The API password.
   * @param proxyConfig - Optional proxy configuration.
   */
  constructor(username: string, password: string, proxyConfig?: ProxyConfig) {
    super(username, password, proxyConfig);
  }

  /**
   * Retrieves the account balance.
   * @returns Promise resolving to BalanceResponse.
   * @throws ErrorResponse if the API call fails.
   */
  public async getBalance(): Promise<number> {
    try {
      // Include credentials in query parameters
      const params = this.withCredentialsParams({});
      const response = await this.apiClient.get<string>('/balance', { params });
      // The API returns balance as plain text
      return parseFloat(response.data);
    } catch (error: any) {
      throw new ErrorResponse(error.response?.data || error.message);
    }
  }
}
