import { API, CatchAxiosError, Response } from '@/utils/api/api';

export type InfoType = {
  build: BuildType;
};

export type BuildType = {
  version: string;
};

export async function getInfo(): Promise<Response<InfoType>> {
  return await CatchAxiosError(() => API.get<InfoType>(`/actuator/getInfo`));
}
