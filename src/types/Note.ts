import { UserInfo } from './User';

export type TypeNote = 'default' | 'pin' | 'trash';

export interface Note {
  _id: number | string;
  title: string;
  content: string;
  background: string;
  topics: string[] | null;
  user: UserInfo;
  type: TypeNote;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
