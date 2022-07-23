import { Note } from './Note';
import { UserResponse } from './User';

export interface Topic {
  _id: string;
  name: string;
  user: UserResponse;
  background: string;
  slug: string;
  notes: Note[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
