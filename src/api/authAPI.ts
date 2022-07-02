import { UserLogin, UserResponse } from 'src/types/User';
import { BaseDataResponse, MessageResponse } from 'src/types';
import axiosInstance from './axiosInstance';

const authAPI = {
  login(data: UserLogin): Promise<BaseDataResponse<UserResponse>> {
    const url = '/auth/login';
    return axiosInstance.post(url, data);
  },
  logout(): Promise<MessageResponse> {
    const url = '/auth/logout';
    return axiosInstance.get(url);
  },
};
export default authAPI;
