import { SmsApi } from './api/sms-api';
import { AccountApi } from './api/account-api';
import { MessageApi } from './api/message-api';
import { InboxApi } from './api/inbox-api';
import { BlacklistApi } from './api/blacklist-api';
import { IysApi } from './api/iys-api';
import { SmsUtils } from './utils/sms-utils';
import { ProxyConfig } from './models/proxy-config';

/**
 * Verimor client class that provides access to all API endpoints.
 */
export class Verimor {
  /** SMS API methods */
  public smsApi: SmsApi;
  /** Account API methods */
  public accountApi: AccountApi;
  /** Message API methods */
  public messageApi: MessageApi;
  /** Inbox API methods */
  public inboxApi: InboxApi;
  /** Blacklist API methods */
  public blacklistApi: BlacklistApi;
  /** IYS API methods */
  public iysApi: IysApi;
  /** SMS utilities */
  public smsUtils: typeof SmsUtils;

  /**
   * Creates an instance of Verimor client.
   * @param username - The API username.
   * @param password - The API password.
   * @param proxyConfig - Optional proxy configuration.
   */
  constructor(username: string, password: string, proxyConfig?: ProxyConfig) {
    this.smsApi = new SmsApi(username, password, proxyConfig);
    this.accountApi = new AccountApi(username, password, proxyConfig);
    this.messageApi = new MessageApi(username, password, proxyConfig);
    this.inboxApi = new InboxApi(username, password, proxyConfig);
    this.blacklistApi = new BlacklistApi(username, password, proxyConfig);
    this.iysApi = new IysApi(username, password, proxyConfig);
    this.smsUtils = SmsUtils;
  }
}
