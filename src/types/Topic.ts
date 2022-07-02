import { UserResponse } from './User';

export interface TopicResponse {
  _id: string;
  name: string;
  user: UserResponse;
  thumbnail: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
