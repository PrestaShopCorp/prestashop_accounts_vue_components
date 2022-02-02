import {Context} from './types/context.type';

export {};

declare global {
  interface Window {
    analytics: unknown;
    contextPsAccounts: Context;
    iso_user: string;
  }
}
