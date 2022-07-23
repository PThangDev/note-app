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
  getNotesOfPins(): Promise<BaseDataResponse<Note[]>> {
    const url = `/notes`;
    return axiosInstance.get(url, { params: { 'type[regex]': 'pin' } });
  },
  getNote(id: string): Promise<BaseDataResponse<Note>> {
    const url = `/notes/${id}`;
    return axiosInstance.get(url);
  },
  createNote(data: CreateNote): Promise<BaseDataResponse<Note>> {
    const url = '/notes';
    return axiosInstance.post(url, data);
  },
  updateNotes(payload: UpdateNote): Promise<BaseDataResponse<Note>> {
    const url = `/notes/${payload.id}`;
    return axiosInstance.put(url, payload.data);
  },
  updateTypeOfNote(payload: UpdateNote): Promise<BaseDataResponse<Note>> {
    const url = `/notes/${payload.id}`;
    return axiosInstance.put(url, payload.data);
  },
  deleteNote(id: string): Promise<BaseDataResponse<Note>> {
    const url = `/notes/${id}`;
    return axiosInstance.delete(url);
  },
};
export default noteAPI;
