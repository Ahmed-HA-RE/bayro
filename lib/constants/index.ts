export const SERVER_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_PROD_URL
    : process.env.NEXT_PUBLIC_DEV_URL;

export const APP_NAME = 'Bayro';
export const RESEND_DOMAIN = process.env.RESEND_DOMAIN;
export const LIMIT_LIST_PRODUCTS = 4;

export const PAYMENT_METHODS = 'PayPal, Credit Card, CashOnDelivery';
export const USERS_ROLES = ['user', 'admin'];
