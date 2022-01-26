import {User} from './user';

export interface Shop {
  domain: string | null;
  domainSsl: string | null;
  employeeId?: number | null; // string ?
  frontUrl?: string | null;
  id: string;
  isLinkedV4?: boolean; // ?
  moduleName?: string;
  multishop?: boolean;
  name: string;
  physicalUri?: string | boolean | null;
  psVersion?: string;
  publicKey: string;
  url: string;
  user?: Partial<User>;
  uuid?: string | null;
  virtualUri?: string | boolean | null;
}
