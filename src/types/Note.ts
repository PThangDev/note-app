import { QueryParams } from '.';
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
  type?: string;
}

export interface UpdateNote {
  id: string;
  data: Partial<CreateNote>;
}

export interface NotesOfTopicRequest {
  topicId: string;
  params: QueryParams;
}
