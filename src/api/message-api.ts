import { BaseApi } from './base-api';
import { MessageStatusResponse } from '../models/message-status-response';
import { ErrorResponse } from '../models/error-response';
import { ProxyConfig } from '../models/proxy-config';

/**
 * MessageApi class provides methods to interact with message-related endpoints.
 */
export class MessageApi extends BaseApi {
  /**
   * Creates an instance of MessageApi.
   * @param username - The API username.
   * @param password - The API password.
   * @param proxyConfig - Optional proxy configuration.
   */
  constructor(username: string, password: string, proxyConfig?: ProxyConfig) {
    super(username, password, proxyConfig);
  }

  /**
   * Retrieves the status of messages.
   * @param params - Parameters for fetching message status.
   * @returns Promise resolving to an array of MessageStatusResponse.
   * @throws ErrorResponse if the API call fails.
   */
  public async getMessageStatus(params: {
    id?: number;
    custom_id?: string;
    dest?: string[];
    greater_than?: number;
  }): Promise<MessageStatusResponse[]> {
    try {
      // Include credentials in query parameters
      const queryParams = this.withCredentialsParams({
        id: params.id,
        custom_id: params.custom_id,
        dest: params.dest ? params.dest.join(',') : undefined,
        greater_than: params.greater_than,
      });

      const response = await this.apiClient.get<MessageStatusResponse[]>('/status', {
        params: queryParams,
      });
      return response.data;
    } catch (error: any) {
      throw new ErrorResponse(error.response?.data || error.message);
    }
  }
}
