export interface User {
  email?: string | null;
  emailIsValidated?: boolean;
  isSuperAdmin: boolean;
  uuid?: string | null,
}

export interface BackendUser {
  email?: string | null;
  employeeId?: number;
  isSuperAdmin: boolean;
}
