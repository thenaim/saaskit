import {
  MailIcon,
  CreditCardIcon,
  GlobeIcon,
  MonitorCogIcon,
  ShieldCheckIcon,
} from 'lucide-react';

export const adminGeneralSettingsNavigation = [
  {
    id: 'application',
    title: 'Application',
    href: '/admin/settings/general/application',
    icon: GlobeIcon,
  },
  {
    id: 'payment',
    title: 'Payment',
    href: '/admin/settings/general/payment',
    icon: CreditCardIcon,
  },
  {
    id: 'email',
    title: 'Email',
    href: '/admin/settings/general/email',
    icon: MailIcon,
  },
  {
    id: 'analytics-cookies',
    title: 'Analytics & Cookies',
    href: '/admin/settings/general/analytics-cookies',
    icon: MonitorCogIcon,
  },
  {
    id: 'recaptcha',
    title: 'ReCaptcha',
    href: '/admin/settings/general/recaptcha',
    icon: ShieldCheckIcon,
  },
];
