/**
 * Custom Error class for handling API error responses.
 */
export class ErrorResponse extends Error {
  /** Error code returned by the API. */
  public code?: number;
  /** Detailed error messages. */
  public errors?: { [key: string]: string[] };

  /**
   * Creates an instance of ErrorResponse.
   * @param errorData - The error data returned by the API.
   */
  constructor(errorData: any) {
    super(errorData.message || 'An error occurred');
    this.name = 'ErrorResponse';
    this.code = errorData.code;
    this.errors = errorData.errors;
  }
}
