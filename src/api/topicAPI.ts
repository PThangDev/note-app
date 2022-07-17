import { Topic } from 'src/types/Topic';
import { BaseDataResponse } from './../types/index';
import axiosInstance from './axiosInstance';

const topicAPI = {
  getTopics(): Promise<BaseDataResponse<Topic[]>> {
    const url = '/topics';
    return axiosInstance.get(url);
  },
  createTopic(data: Partial<Topic>): Promise<BaseDataResponse<Topic>> {
    const url = '/topics';
    return axiosInstance.post(url, data);
  },
};
export default topicAPI;
