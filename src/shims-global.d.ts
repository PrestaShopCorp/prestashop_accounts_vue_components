import {Context} from './types/context';

export {};

declare global {
  interface Window {
    analytics: unknown;
    contextPsAccounts: Context;
    iso_user: string;
    psAccountZoidExport: any;
  }
}
