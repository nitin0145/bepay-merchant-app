import { dashboardHandlers } from './dashboard.handlers';
import { transactionHandlers } from './transaction.handlers';
import { paymentLinkHandlers } from './payment-link.handlers';

export const handlers = [
  ...dashboardHandlers,
  ...transactionHandlers,
  ...paymentLinkHandlers,
];
