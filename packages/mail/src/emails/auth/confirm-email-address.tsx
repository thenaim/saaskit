import {
  Body,
  Button,
  Container,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import { type Prisma } from '@repo/database/index';

import { Fragment } from 'react';

interface Props {
  user: Prisma.UserGetPayload<{
    select: {
      name: true;
    };
  }>;
  emailConfirmLink: string;
}

export const ConfirmEmailAddressEmailTemplate = ({
  user,
  emailConfirmLink,
}: Props) => {
  return (
    <Html>
      <Tailwind
        config={{
          presets: [],
        }}
      >
        <Fragment>
          <Preview>Confirm Email Adress</Preview>
          <Body className="bg-[#f6f9fc] font-sans">
            <Container className="bg-white mx-auto py-5 mb-16">
              <Section className="px-12">
                <Img
                  src={`https://react-email-demo-6kpc0tt4n-resend.vercel.app/static/stripe-logo.png`}
                  width="49"
                  height="21"
                  alt="Stripe"
                />
                <Hr className="border-t border-[#e6ebf1] my-5" />
                <Text className="text-[#525f7f] text-base leading-6 text-left">
                  Hi {user.name},
                </Text>
                <Text className="text-brand leading-6 text-left">
                  Please click below to confirm your email
                </Text>
                <Button
                  className="bg-[#656ee8] text-white font-bold text-base text-center block w-full py-2 rounded"
                  href={emailConfirmLink}
                  referrerPolicy="no-referrer"
                  target="_blank"
                >
                  Confirm Email Address
                </Button>
                <Hr className="border-t border-[#e6ebf1] my-5" />
                <Text className="text-[#525f7f] text-base leading-6 text-left">
                  If you didn't request this, just ignore and delete this
                  message.
                </Text>
                <Text className="text-[#525f7f] text-base leading-6 text-left">
                  To keep your account secure, please don't forward this email
                  to anyone. See our Help Center for{' '}
                  <Link
                    className="text-[#556cd6]"
                    href="https://dashboard.stripe.com/login?redirect=%2Fapikeys"
                  >
                    more security tips
                  </Link>
                </Text>
                <Text className="text-[#525f7f] text-base leading-6 text-left">
                  — The Stripe team
                </Text>
                <Hr className="border-t border-[#e6ebf1] my-5" />
                <Text className="text-[#8898aa] text-xs leading-4">
                  Stripe, 354 Oyster Point Blvd, South San Francisco, CA 94080
                </Text>
              </Section>
            </Container>
          </Body>
        </Fragment>
      </Tailwind>
    </Html>
  );
};

ConfirmEmailAddressEmailTemplate.PreviewProps = {
  user: {
    name: 'Demo',
  },
  emailConfirmLink: 'http://localhost:3000/auth/signin/confirm/[token]',
} as Props;

export default ConfirmEmailAddressEmailTemplate;
