import { UserResponse } from './User';
import { QueryParams } from '.';

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
