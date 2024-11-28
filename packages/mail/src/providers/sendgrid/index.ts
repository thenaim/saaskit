import { EmailProvider } from '@repo/database/index';
import sendgrid from '@sendgrid/mail';

export type SendgridSendType = {
  type: typeof EmailProvider.sendgrid;
  data: {
    options: sendgrid.MailDataRequired | sendgrid.MailDataRequired[];
    SENDGRID_API_KEY: string;
  };
};

export const sendgridSend = async ({
  options,
  SENDGRID_API_KEY,
}: SendgridSendType['data']) => {
  try {
    sendgrid.setApiKey(SENDGRID_API_KEY);

    await sendgrid.send(options);

    return { success: true };
  } catch (error) {
    return { success: false };
  }
};
