import { BaseDataResponse, QueryParams } from 'src/types';
import {
  CreateNote,
  Note,
  NotesOfTopicRequest,
  UpdateNote,
  UpdateNotesRequest,
} from 'src/types/Note';
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

  getNotesOfPins(params?: QueryParams): Promise<BaseDataResponse<Note[]>> {
    const url = `/notes`;
    return axiosInstance.get(url, { params: { is_pin: true, is_trash: false } });
  },
  getNotesOther(params?: QueryParams): Promise<BaseDataResponse<Note[]>> {
    const url = `/notes`;
    return axiosInstance.get(url, { params: { is_trash: false, is_pin: false, topics: 'null' } });
  },
  getNote(id: string): Promise<BaseDataResponse<Note>> {
    const url = `/notes/${id}`;
    return axiosInstance.get(url);
  },
  createNote(data: CreateNote): Promise<BaseDataResponse<Note>> {
    const url = '/notes';
    return axiosInstance.post(url, data);
  },
  updateNote(payload: UpdateNote): Promise<BaseDataResponse<Note>> {
    const url = `/notes/${payload.id}`;
    return axiosInstance.put(url, payload.data);
  },
  updateNotes(data: UpdateNotesRequest): Promise<BaseDataResponse<string[]>> {
    const url = `/notes`;
    return axiosInstance.put(url, data);
  },

  updateTypeOfNote(payload: UpdateNote): Promise<BaseDataResponse<Note>> {
    const url = `/notes/${payload.id}`;
    return axiosInstance.put(url, payload.data);
  },
  deleteNote(id: string): Promise<BaseDataResponse<Note>> {
    const url = `/notes/${id}`;
    return axiosInstance.delete(url);
  },
  deleteManyNotes(data: { notes: string[] }): Promise<BaseDataResponse<any>> {
    const url = `/notes`;

    return axiosInstance.delete(url, { data });
  },
};
export default noteAPI;
