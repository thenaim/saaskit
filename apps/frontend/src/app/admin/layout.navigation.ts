import {
  HomeIcon,
  CogIcon,
  BookTextIcon,
  BookCopyIcon,
  MailIcon,
  KeyRoundIcon,
  WalletCardsIcon,
  CreditCardIcon,
  UsersIcon,
  UserCog2Icon,
  BadgePercentIcon,
  Columns3Icon,
  ShoppingBagIcon,
  ArrowRightLeftIcon,
  LayersIcon,
  SquarePenIcon,
  SlidersHorizontalIcon,
  CircleUserRoundIcon,
  PackageIcon,
  SquareChartGanttIcon,
} from 'lucide-react';

export const adminTopNavigation = [
  {
    title: 'Dashboard',
    icon: HomeIcon,
    href: '/admin/dashboard',
  },
];

export const adminMainNavigation = [
  {
    title: 'Revenue',
    icon: SquareChartGanttIcon,
    children: [
      {
        title: 'Orders',
        href: '/admin/revenue/orders',
        icon: LayersIcon,
      },
      {
        title: 'Subscriptions',
        href: '/admin/revenue/subscriptions',
        icon: WalletCardsIcon,
      },
      {
        title: 'Transactions',
        href: '/admin/revenue/transactions',
        icon: ArrowRightLeftIcon,
      },
    ],
  },
  {
    title: 'Product Management',
    icon: PackageIcon,
    children: [
      {
        title: 'One-time Purchase Products',
        href: '/admin/product/one-times',
        icon: ShoppingBagIcon,
      },
      {
        title: 'Subscription Products',
        href: '/admin/product/subscriptions',
        icon: WalletCardsIcon,
      },
      {
        title: 'Plans',
        href: '/admin/product/plans',
        icon: Columns3Icon,
      },
      {
        title: 'Discounts',
        href: '/admin/product/discounts',
        icon: BadgePercentIcon,
      },
    ],
  },
  {
    title: 'User Management',
    icon: CircleUserRoundIcon,
    children: [
      {
        title: 'Users',
        href: '/admin/users/list',
        icon: UsersIcon,
      },
      {
        title: 'Roles',
        href: '/admin/users/roles',
        icon: UserCog2Icon,
      },
    ],
  },
  {
    title: 'Settings',
    icon: CogIcon,
    children: [
      {
        title: 'General Settings',
        href: '/admin/settings/general',
        icon: SlidersHorizontalIcon,
      },
      {
        title: 'Email Providers',
        href: '/admin/settings/email-providers',
        icon: MailIcon,
      },
      {
        title: 'Oauth Providers',
        href: '/admin/settings/oauth-providers',
        icon: KeyRoundIcon,
      },
      {
        title: 'Payment Providers',
        href: '/admin/settings/payment-providers',
        icon: CreditCardIcon,
      },
    ],
  },
  {
    title: 'Blog',
    icon: SquarePenIcon,
    children: [
      {
        title: 'Posts',
        href: '/admin/blog/posts',
        icon: BookTextIcon,
      },
      {
        title: 'Post Categories',
        href: '/admin/blog/categories',
        icon: BookCopyIcon,
      },
    ],
  },
];

export const adminNavigation = [
  {
    title: 'Dashboard',
    Icon: HomeIcon,
    href: '/admin/dashboard',
  },
  {
    title: 'Revenue',
    children: [
      {
        title: 'Orders',
        href: '/admin/revenue/orders',
        Icon: LayersIcon,
      },
      {
        title: 'Subscriptions',
        href: '/admin/revenue/subscriptions',
        Icon: WalletCardsIcon,
      },
      {
        title: 'Transactions',
        href: '/admin/revenue/transactions',
        Icon: ArrowRightLeftIcon,
      },
    ],
  },
  {
    title: 'Product Management',
    children: [
      {
        title: 'One-time Purchase Products',
        href: '/admin/products/one-time',
        Icon: ShoppingBagIcon,
      },
      {
        title: 'Subscription Products',
        href: '/admin/products/subscription',
        Icon: WalletCardsIcon,
      },
      {
        title: 'Plans',
        href: '/admin/products/plans',
        Icon: Columns3Icon,
      },
      {
        title: 'Discounts',
        href: '/admin/products/discounts',
        Icon: BadgePercentIcon,
      },
    ],
  },
  {
    title: 'User Management',
    children: [
      {
        title: 'Users',
        href: '/admin/users/list',
        Icon: UsersIcon,
      },
      {
        title: 'Roles',
        href: '/admin/users/roles',
        Icon: UserCog2Icon,
      },
    ],
  },
  {
    title: 'Settings',
    children: [
      {
        title: 'General Settings',
        href: '/admin/settings/general',
        Icon: CogIcon,
      },
      {
        title: 'Email Providers',
        href: '/admin/settings/email-providers',
        Icon: MailIcon,
      },
      {
        title: 'Oauth Providers',
        href: '/admin/settings/oauth-providers',
        Icon: KeyRoundIcon,
      },
      {
        title: 'Payment Providers',
        href: '/admin/settings/payment-providers',
        Icon: CreditCardIcon,
      },
    ],
  },
  {
    title: 'Blog',
    children: [
      {
        title: 'Posts',
        href: '/admin/blog/posts',
        Icon: BookTextIcon,
      },
      {
        title: 'Post Categories',
        href: '/admin/blog/categories',
        Icon: BookCopyIcon,
      },
    ],
  },
];
