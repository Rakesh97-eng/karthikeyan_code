import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import Qs from 'qs';
import {
  deserialize,
  CaseType,
  Options,
  DocumentObject,
  serialize,
  SerializeOptions,
} from 'jsonapi-fractal';
import { API_ERRORS, PaginationData } from '../types/services/Common';
interface RequestOptions {
  apiVersion: string;
}

/**
 * Create a base class that initializes axios and has all the base calls
 * like GET, POST, PATCH in it, Also maintains the state of the auth token
 * and checks it before executing any call.
 */
export class Axios<ResourceData> {
  /**
   * Axios Instance
   */
  private static _instance: AxiosInstance | undefined;

  /**
   * Auth Token
   */
  private static _token: string | undefined;

  private static _getAccessToken: () => Promise<string>;

  /**
   * default api version
   */
  private OPTIONS: RequestOptions = {
    apiVersion: 'v1',
  };

  /**
   * create an axios instance
   */
  private static createInstance() {
    this._instance = axios.create({
      baseURL: `${process.env.REACT_APP_MIDDLEWARE_URL}/admin/api`,
      headers: {
        Authorization: `Bearer ${this._token}`,
        'content-type': 'application/json',
      },
      paramsSerializer: (params) =>
        Qs.stringify(params, { arrayFormat: 'brackets' }),
    });

    this._instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (401 === error.response.status) {
          try {
            const token = await this._getAccessToken();
            const config = error.config;
            config.headers = {
              ...config.headers,
              Authorization: `Bearer ${token}`,
            };
            return axios.request(config);
          } catch (e) {
            return Promise.reject(error);
          }
        } else {
          return Promise.reject(error);
        }
      }
    );
  }

  /**
   * setter for auth token
   * @param {string} authToken
   */
  static set token(authToken: string) {
    if (authToken) {
      Axios._token = authToken;
      Axios.createInstance();
    } else {
      Axios._token = undefined;
      Axios._instance = undefined;
    }
  }

  static set getAccessToken(func: () => Promise<string>) {
    this._getAccessToken = func;
  }

  /**
   * getter for auth token
   * access auth token is forbidden
   */
  get token() {
    return 'ER:401 - Access Denied';
  }

  /**
   * check if instance has been defined
   * @throws {Custom Error}
   */
  checkAuthAndInstance() {
    if (!Axios._token || !Axios._instance) {
      throw new Error(API_ERRORS.NO_TOKEN);
    }
  }

  /**
   * getter for instance
   * but only inside the Axios class
   */
  private get instance(): AxiosInstance {
    if (!Axios._instance) {
      throw new Error(API_ERRORS.NO_TOKEN);
    }
    return Axios._instance;
  }

  /**
   * deserialize the response from JSON:API to JSON structure
   * @generic R - Response data inferred from the Child Class
   * @param data {DocumentObject} JSON API data
   * @param isPaginated {boolean} [isPaginated=false] is the response paginated
   * @return isPaginated = true -> PaginationData<R>; false -> R
   */
  deserializeResponse<R = ResourceData>(
    data: DocumentObject,
    isPaginated: false
  ): R;
  deserializeResponse<R = ResourceData>(
    data: DocumentObject,
    isPaginated: true
  ): PaginationData<R>;
  deserializeResponse<R = ResourceData>(
    data: DocumentObject,
    isPaginated = false
  ) {
    const deserializeData = deserialize<R, Options<R>>(data, {
      changeCase: CaseType.camelCase,
      changeCaseDeep: true,
    });
    if (!deserializeData) {
      throw new Error(API_ERRORS.NO_DESERIALIZED);
    }

    if (isPaginated && Array.isArray(deserializeData)) {
      return {
        meta: data.meta,
        data: deserializeData,
      };
    }

    return deserializeData;
  }

  /**
   * serialize the request as per JSON:API structures
   * @generic R - Response data inferred from the Child Class
   * @param entityType {string} the type of entity for serialization
   * @param data {R} data to be serialized
   * @param options {SerializeOptions} [options={}] serialization options
   * @return R
   */
  serializeRequestBody<R = ResourceData>(
    entityType: string,
    data: R,
    options: SerializeOptions = {}
  ) {
    const serializeData = serialize(data, entityType, {
      changeCase: CaseType.snakeCase,
      changeCaseDeep: true,
      ...options,
    });

    if (!serializeData) {
      throw new Error(API_ERRORS.NO_SERIALIZED);
    }

    return serializeData;
  }

  /**
   * create a get request
   * @param url {string} url path the request needs to be sent
   * @param params {Params} [params={}] required to be sent
   * @param options {Partial<RequestOptions>} [options=this.OPTIONS] request flags
   * @returns _ {JsonResponse} JsonResponse passed during the function call
   */
  async getRequest<Params, ApiResponse = DocumentObject>(
    url: string,
    params?: Params,
    options: Partial<RequestOptions> = this.OPTIONS
  ) {
    this.checkAuthAndInstance();
    const requestOptions = {
      ...this.OPTIONS,
      ...options,
    };
    const axiosConfig: AxiosRequestConfig = {
      params,
    };
    const response = await this.instance.get<ApiResponse>(
      `${requestOptions.apiVersion}/${url}`,
      axiosConfig
    );
    if (response.status === 401) {
      throw new Error(API_ERRORS.NO_TOKEN);
    }
    return response.data;
  }

  /**
   * create a patch request
   * @param url {string} url path the request needs to be sent
   * @param data {data} [data={}] required to be sent
   * @param options {Partial<RequestOptions>} [options=this.OPTIONS] request flags
   * @returns _ {JsonResponse} JsonResponse passed during the function call
   */
  async patchRequest<PayloadType, ApiResponse = DocumentObject>(
    url: string,
    data?: PayloadType,
    options: Partial<RequestOptions> = this.OPTIONS
  ) {
    this.checkAuthAndInstance();
    const requestOptions = {
      ...this.OPTIONS,
      ...options,
    };
    const axiosConfig: AxiosRequestConfig = {
      ...data,
    };
    const response = await this.instance.patch<ApiResponse>(
      `${requestOptions.apiVersion}/${url}`,
      axiosConfig
    );
    return response.data;
  }

  /**
   * create a POST request
   * @param url {string} url path the request needs to be sent
   * @param data {data} [data={}] required to be sent
   * @param options {Partial<RequestOptions>} [options=this.OPTIONS] request flags
   * @returns _ {JsonResponse} JsonResponse passed during the function call
   */
  async postRequest<PayloadType, ApiResponse = DocumentObject>(
    url: string,
    data?: PayloadType,
    options: Partial<RequestOptions> = this.OPTIONS
  ) {
    this.checkAuthAndInstance();
    const requestOptions = {
      ...this.OPTIONS,
      ...options,
    };
    const axiosConfig: AxiosRequestConfig = {
      ...data,
    };
    const response = await this.instance.post<ApiResponse>(
      `${requestOptions.apiVersion}/${url}`,
      axiosConfig
    );
    return response.data;
  }

  /**
   * create a Delete request
   * @param url {string} url path the request needs to be sent
   * @param options {Partial<RequestOptions>} [options=this.OPTIONS] request flags
   * @returns _ {JsonResponse} JsonResponse passed during the function call
   */
  async deleteRequest<ApiResponse = DocumentObject>(
    url: string,
    options: Partial<RequestOptions> = this.OPTIONS
  ) {
    this.checkAuthAndInstance();
    const requestOptions = {
      ...this.OPTIONS,
      ...options,
    };
    const response = await this.instance.delete<ApiResponse>(
      `${requestOptions.apiVersion}/${url}`
    );
    return response.data;
  }
}
