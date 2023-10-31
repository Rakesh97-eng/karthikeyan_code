import axios, { AxiosError, AxiosRequestHeaders } from 'axios';
import { AXIOS_METHODS } from '../constants/enums';

interface AxiosResponseType<DataType> {
  success: boolean;
  data: DataType;
  message: string;
  token: string;
}

export class AxiosClass {
  token: string | undefined = undefined;
  headers: AxiosRequestHeaders = {};
  statusCode = 0;

  setAuthToken(token: string) {
    this.token = token;
    return this;
  }
  setHeaders(headers: AxiosRequestHeaders) {
    this.headers = headers;
    return this;
  }

  async callApi<PayloadType, DataType>(
    method: AXIOS_METHODS,
    url: string,
    params?: PayloadType | undefined | null,
    dataSet?: PayloadType | undefined
  ): Promise<AxiosResponseType<DataType>> {
    try {
      const headers: Record<string, string> = {
        Authorization: `Basic ${this.token}`,
        ...this.headers,
      };
      if (!this.headers.Authorization) {
        delete headers.Authorization;
      }

      const response = await axios({
        method: method,
        url: `${url}${params ? params : ''}`,
        headers: headers,
        data: dataSet,
      });
      return response.status == 204 ? { data: true } : response.data;
    } catch (error: any) {
      throw new AxiosError(error.message, error);
    }
  }
}

export const Axios = new AxiosClass();
