import { mailConfig } from 'config/mail'
import * as nodemailer from 'nodemailer';

export class MailService {
  private readonly maxRetries: number = 3

  /**
   * Sends an email with retry logic in case of failure.
   * @param email - The recipient's email address.
   * @param subject - The subject of the email.
   * @param mailBody - The body of the email.
   * @param retryCount - The current retry attempt count (default is 1).
   * @returns A boolean indicating whether the email was sent successfully, or null if max retries are reached.
   */
  async sendMailWithRetry(
    email: string,
    subject: string,
    mailBody: string,
    retryCount = 1,
  ): Promise<boolean | null> {
    // Prepare mail options
    const mailOptions = {
      from: email,
      to: mailConfig.user,
      subject,
      html: mailBody,
    }

    try {
      // Create a transporter and send mail
      const transporter = nodemailer.createTransport(mailConfig.options)
      const res = await transporter.sendMail(mailOptions)

      // Return true if mail was sent successfully
      if (!res) return false
      return true
    } catch (error: Error | any) {
      console.error('Mail service error:', error.message)

      // Retry logic
      if (retryCount < this.maxRetries) {
        // If max retries not reached, retry sending mail
        return this.sendMailWithRetry(email, subject, mailBody, retryCount + 1)
      }

      // If max retries reached, return null
      return null
    }
  }

  /**
   * Sends an email, handling retries internally.
   * @param email - The recipient's email address.
   * @param subject - The subject of the email.
   * @param mailBody - The body of the email.
   * @returns A boolean indicating whether the email was sent successfully, or null if max retries are reached.
   */
  async sendMail(email: string, subject: string, mailBody: string): Promise<boolean | null> {
    // Start with the first attempt (retryCount = 1)
    return await this.sendMailWithRetry(email, subject, mailBody)
  }
}

// Export a singleton instance
export const mailService = new MailService()
