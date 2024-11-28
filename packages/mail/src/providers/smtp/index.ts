import { EmailProvider } from '@repo/database/index';
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export type SmtpSendType = {
  type: typeof EmailProvider.smtp;
  data: {
    transport: SMTPTransport | SMTPTransport.Options | string;
    options: Mail.Options;
  };
};

export const smptSend = async ({
  transport,
  options,
}: SmtpSendType['data']) => {
  try {
    const transporter = nodemailer.createTransport(transport);

    await transporter.sendMail(options);

    transporter.close();

    return { success: true };
  } catch (error) {
    return { success: false };
  }
};
