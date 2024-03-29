export type UserRole = 'customer' | 'admin';
export type UserStatus = 'pending' | 'active' | 'banned';
export interface UserInfo {
  _id: string;
  username: string;
  password: string;
  email: string;
  avatar: string;
  slug: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface UserLogin {
  account: string;
  password: string;
}
export interface UserRegister {
  username: string;
  email: string;
  password: string;
}

export interface UserResponse extends UserInfo {
  access_token: string;
  refresh_token: string;
}

export interface UserForgotPassword {
  email: string;
}

export type ForgotPasswordResponse = Pick<UserResponse, 'access_token'>;
