import { Topic } from 'src/types/Topic';
import { BaseDataResponse } from './../types';
import axiosInstance from './axiosInstance';

const topicAPI = {
  getTopics(): Promise<BaseDataResponse<Topic[]>> {
    const url = '/topics';
    return axiosInstance.get(url);
  },
  getTopicDetail(id: string): Promise<BaseDataResponse<Topic>> {
    const url = `/topics/${id}`;
    return axiosInstance.get(url);
  },
  createTopic(data: Partial<Topic>): Promise<BaseDataResponse<Topic>> {
    const url = '/topics';
    return axiosInstance.post(url, data);
  },
  updateTopic(data: Partial<Topic>): Promise<BaseDataResponse<Topic>> {
    const url = `/topics/${data._id}`;
    const dataUpdate = { ...data };
    delete dataUpdate._id;
    console.log(dataUpdate);
    return axiosInstance.put(url, dataUpdate);
  },
  deleteTopic(id: string): Promise<BaseDataResponse<Topic>> {
    const url = `/topics/${id}`;
    return axiosInstance.delete(url);
  },
};
export default topicAPI;
