export interface MessageResponse {
  message: string;
}

export interface BaseDataResponse<T = any> extends MessageResponse {
  data?: T;
}
export interface ErrorResponse {
  errors: {
    message: string;
    [key: string]: string;
  };
  status?: number;
}

export interface QueryParams {
  [key: string]: string;
}
