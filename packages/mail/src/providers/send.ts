import { EmailProvider } from '@repo/database/index';
import { SendgridSendType, sendgridSend } from './sendgrid';
import { SmtpSendType, smptSend } from './smtp';

export type SendByProviderProps = SmtpSendType | SendgridSendType;

export const sendByProvider = (props: SendByProviderProps) => {
  switch (props.type) {
    case EmailProvider.sendgrid:
      return sendgridSend(props.data);
    case EmailProvider.smtp:
      return smptSend(props.data);
  }
};
