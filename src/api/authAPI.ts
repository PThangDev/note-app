import { UserLogin, UserResponse } from 'src/types/User';
import { BaseDataResponse } from 'src/types';
import axiosInstance from './axiosInstance';

const authAPI = {
  login(data: UserLogin): Promise<BaseDataResponse<UserResponse>> {
    const url = '/auth/login';
    return axiosInstance.post(url, data);
  },
};
export default authAPI;
