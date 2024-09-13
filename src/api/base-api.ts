import axios, { AxiosInstance } from 'axios';
import * as https from 'https';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { ProxyConfig } from '../models/proxy-config';

/**
 * BaseApi class sets up the Axios instance with authentication and optional proxy settings.
 */
export class BaseApi {
  protected apiClient: AxiosInstance;

  /**
   * Creates an instance of BaseApi.
   * @param username - The API username.
   * @param password - The API password.
   * @param proxyConfig - Optional proxy configuration.
   */
  constructor(
    protected username: string,
    protected password: string,
    proxyConfig?: ProxyConfig,
  ) {
    const axiosConfig: any = {
      baseURL: 'https://sms.verimor.com.tr/v2',
    };

    if (proxyConfig) {
      const proxyAuth =
        proxyConfig.auth && proxyConfig.auth.username && proxyConfig.auth.password
          ? `${proxyConfig.auth.username}:${proxyConfig.auth.password}@`
          : '';
      const proxyUrl = `http://${proxyAuth}${proxyConfig.host}:${proxyConfig.port}`;

      // Create an HTTPS proxy agent
      const agent = new HttpsProxyAgent(proxyUrl);
      axiosConfig.httpsAgent = agent;
      axiosConfig.proxy = false; // Disable default proxy handling
    }

    this.apiClient = axios.create(axiosConfig);
  }

  /**
   * Prepares data by adding username and password.
   * @param data - The request data.
   * @returns The data with credentials added.
   */
  protected withCredentials(data: any): any {
    return {
      username: this.username,
      password: this.password,
      ...data,
    };
  }

  /**
   * Prepares params by adding username and password.
   * @param params - The query parameters.
   * @returns The params with credentials added.
   */
  protected withCredentialsParams(params: any): any {
    return {
      username: this.username,
      password: this.password,
      ...params,
    };
  }
}
