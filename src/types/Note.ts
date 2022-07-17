import { Topic } from './Topic';
import { UserInfo } from './User';

export type TypeNote = 'default' | 'pin' | 'trash';

export interface Note {
  _id: string;
  title: string;
  content: string;
  background: string;
  topics: Topic[] | null;
  user: UserInfo;
  type: TypeNote;
  slug: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CreateNote {
  title: string;
  content: string;
  background: string;
  topics: string[];
}

export interface UpdateNote {
  slug: string;
  data: Partial<CreateNote>;
}
