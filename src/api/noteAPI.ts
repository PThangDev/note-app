import { BaseDataResponse, QueryParams } from 'src/types';
import { CreateNote, Note, NotesOfTopicRequest, UpdateNote } from 'src/types/Note';
import axiosInstance from './axiosInstance';

const noteAPI = {
  getNotes(params?: QueryParams): Promise<BaseDataResponse<Note[]>> {
    const url = '/notes';
    return axiosInstance.get(url, { params });
  },
  getNotesOfTopic({ topicId, params }: NotesOfTopicRequest): Promise<BaseDataResponse<Note[]>> {
    const url = `/notes/${topicId}`;
    return axiosInstance.get(url, { params });
  },
  getNoteBySlug(slug: string): Promise<BaseDataResponse<Note>> {
    const url = `/notes/${slug}`;
    return axiosInstance.get(url);
  },
  createNote(data: CreateNote): Promise<BaseDataResponse<Note>> {
    const url = '/notes';
    return axiosInstance.post(url, data);
  },
  updateNotes(payload: UpdateNote): Promise<BaseDataResponse<Note>> {
    const url = `/notes/${payload.slug}`;
    return axiosInstance.put(url, payload.data);
  },
  deleteNote(slug: string): Promise<BaseDataResponse<Note>> {
    const url = `/notes/${slug}`;
    return axiosInstance.delete(url);
  },
};
export default noteAPI;
