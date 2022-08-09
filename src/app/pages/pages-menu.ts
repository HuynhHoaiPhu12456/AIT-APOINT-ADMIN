import { NbMenuItem } from "@nebular/theme";

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: "MASTER",
    group: true,
  },
  {
    title: 'Department',
    icon: 'grid-outline',
    link: '/pages/department',
  },
  {
    title: 'Employee',
    icon: 'people-outline',
    link: '/pages/employee',
  },
  {
    title: 'Reward-inventory',
    icon: 'gift-outline',
    link: '/pages/reward/inventory',
  },
  {
    title: 'Reward-order',
    icon: 'shopping-bag-outline',
    link: '/pages/reward/order',
  },
  {
    title: 'Event-category',
    icon: 'award-outline',
    link: '/pages/event'
  },
  {
    title: "BUSINESS",
    group: true,
  },
  {
    title: "Auth",
    icon: "lock-outline",
    children: [
      {
        title: "Login",
        link: "/auth/login",
      },
      {
        title: "Register",
        link: "/auth/register",
      },
      {
        title: "Request Password",
        link: "/auth/request-password",
      },
      {
        title: "Reset Password",
        link: "/auth/reset-password",
      },
    ],
  },
];
