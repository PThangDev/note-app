import { TopicResponse } from 'src/types/Topic';
import { BaseDataResponse } from './../types/index';
import axiosInstance from './axiosInstance';

const topicAPI = {
  getTopics(): Promise<BaseDataResponse<TopicResponse[]>> {
    const url = '/topics';
    return axiosInstance.get(url);
  },
};
export default topicAPI;
