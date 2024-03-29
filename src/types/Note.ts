import { QueryParams } from '.';
import { Topic } from './Topic';
import { UserInfo } from './User';

export interface NoteBase {
  _id: string;
  title: string;
  content: string;
  background: string;
  topics: string[];
  user: string;
  is_trash: boolean;
  is_pin: boolean;
  slug: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Note extends Omit<NoteBase, 'topics'> {
  topics: Topic[] | null;
}

export interface CreateNote {
  title: string;
  content: string;
  background: string;
  topics: string[];
}

export interface UpdateNote {
  id: string;
  data: Partial<NoteBase>;
}

export interface UpdateNotesRequest {
  noteIds: string[];
  update: Partial<NoteBase>;
}

export interface NotesOfTopicRequest {
  topicId: string;
  params: QueryParams;
}
