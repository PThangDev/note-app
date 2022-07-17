import { UserResponse } from './User';

export interface Topic {
  _id: string;
  name: string;
  user: UserResponse;
  background: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
