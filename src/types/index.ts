export interface MessageResponse {
  message: string;
}

export interface BaseDataResponse<T> extends MessageResponse {
  data?: T;
}
