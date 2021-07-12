import { IPaginationResponse } from '../services/pagination';

export type TApiResponseDefault<T> = {
  status: boolean;
  statusCode: number;
  message: string;
  data: T;
};

export type TApiResponseWithPagination<T> = {
  status: boolean;
  statusCode: number;
  message: string;
} & IPaginationResponse<T>;

export class ApiResponse {
  static async withPagination<T>(
    data: IPaginationResponse<T>,
    message: string,
  ): Promise<TApiResponseWithPagination<T>> {
    return {
      status: true,
      statusCode: 200,
      message: message,
      ...data,
    };
  }

  static async default<T>(
    data: T,
    message: string,
  ): Promise<TApiResponseDefault<T>> {
    return {
      status: true,
      statusCode: 200,
      message: message,
      data: data,
    };
  }
}
