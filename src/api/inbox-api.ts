import { BaseApi } from './base-api';
import { InboxMessage } from '../models/inbox-message';
import { ErrorResponse } from '../models/error-response';
import { ProxyConfig } from '../models/proxy-config';

/**
 * InboxApi class provides methods to interact with inbox-related endpoints.
 */
export class InboxApi extends BaseApi {
  /**
   * Creates an instance of InboxApi.
   * @param username - The API username.
   * @param password - The API password.
   * @param proxyConfig - Optional proxy configuration.
   */
  constructor(username: string, password: string, proxyConfig?: ProxyConfig) {
    super(username, password, proxyConfig);
  }

  /**
   * Retrieves inbox messages.
   * @param fromTime - Start time for fetching messages (ISO 8601 format).
   * @param toTime - End time for fetching messages (ISO 8601 format).
   * @param greaterThan - Fetch messages with message_id greater than this value.
   * @returns Promise resolving to an array of InboxMessage.
   * @throws ErrorResponse if the API call fails.
   */
  public async getInboxMessages(
    fromTime?: string,
    toTime?: string,
    greaterThan?: number
  ): Promise<InboxMessage[]> {
    try {
      const params = this.withCredentialsParams({
        from_time: fromTime,
        to_time: toTime,
        greater_than: greaterThan,
      });

      const response = await this.apiClient.get<InboxMessage[]>('/inbound_messages', {
        params,
      });
      return response.data;
    } catch (error: any) {
      throw new ErrorResponse(error.response?.data || error.message);
    }
  }
}
