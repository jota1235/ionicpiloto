export type UserRole = 'admin' | 'user';

export interface User {
  id?: number;
  email: string;
  password?: string;
  name: string;
  role: UserRole;
  createdAt?: string;
}

export interface UserProfile {
  id: number;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
}
