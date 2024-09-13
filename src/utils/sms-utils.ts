/**
 * Utility class for SMS-related calculations.
 */
export class SmsUtils {
  /**
   * Calculates the number of SMS credits required for the given message.
   * @param message - The message content.
   * @returns The number of SMS credits required.
   */
  public static calculateSmsCredits(message: string): number {
    const length = message.length;
    const isUnicode = /[^\u0000-\u00FF]/.test(message);
    const specialChars = /[\^{}\\[\]~|€]/g;
    const specialCharCount = (message.match(specialChars) || []).length;
    let credits = 0;

    if (isUnicode) {
      if (length <= 70) {
        credits = 1;
      } else {
        credits = Math.ceil(length / 67);
      }
    } else {
      const adjustedLength = length + specialCharCount;
      if (adjustedLength <= 160) {
        credits = 1;
      } else {
        credits = Math.ceil(adjustedLength / 153);
      }
    }

    return credits;
  }
}
