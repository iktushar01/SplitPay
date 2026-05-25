export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status?: string;
  emailVerified?: boolean;
  needPasswordChange?: boolean;
  createdAt?: string;
  image?: string | null;
  avatar?: string | null;
}

export type UserFromCookie = AuthUser & { avatar?: string | null };

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  token: string;
  user: AuthUser;
}
