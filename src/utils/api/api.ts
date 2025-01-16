import { ApiError, ResponseError } from '@/types/types';
import Axios, { AxiosResponse } from 'axios';
import { authLogin } from './requests/auth.api';

export const API = Axios.create({
  baseURL: '/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export type Response<T> =
  | {
      data?: T;
      error?: ResponseError;
    }
  | {
      data: T;
      error: undefined;
    }
  | {
      data: undefined;
      error: ResponseError;
    };

export async function CatchAxiosError<T>(
  func: () => Promise<AxiosResponse<T>>,
): Promise<Response<T>> {
  try {
    const response = await func();
    return { data: response.data };
  } catch (error) {
    if (Axios.isAxiosError(error)) {
      if (
        error.response?.status === 401 &&
        !error.request?.responseURL?.includes('logout')
      ) {
        await authLogin(window.location.pathname);
      }
      const apiError = error.response?.data as ApiError;
      return { error: { message: error.message, apiError } };
    } else if (error instanceof Error) {
      return { error: { message: error.message } };
    } else {
      return { error: { message: String(error) } };
    }
  }
}
