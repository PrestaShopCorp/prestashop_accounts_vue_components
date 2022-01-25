export {};

declare global {
  interface Window {
    analytics: unknown;
    contextPsAccounts: Record<string, any>;
    iso_user: string;
  }
}
