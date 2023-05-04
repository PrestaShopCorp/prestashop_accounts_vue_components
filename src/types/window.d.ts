import { Context } from './types/context';

export {};

declare global {
  interface Window {
    contextPsAccounts: Context
    iso_user: string
    psAccountZoidExport: any
  }
}
