export interface UserInfo {
  _id: string;
  username: string;
  password: string;
  email: string;
  avatar: string;
  slug: string;
  role: 'customer' | 'admin';
  createdAt: string;
  updateAt: string;
}

export interface UserLogin {
  account: string;
  password: string;
}

export interface UserResponse extends UserInfo {
  access_token: string;
  refresh_token: string;
  __v: number;
}
