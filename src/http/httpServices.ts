import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';

class HttpService {
  private axiosService: AxiosInstance;
  constructor() {
    this.axiosService = axios.create({
      headers: { 'Content-Type': 'application/json' },
    });

    this.axiosService.interceptors.response.use(
      (successResponse) => successResponse,
      async (error) => {
        return Promise.reject(error);
      }
    );

    this.axiosService.interceptors.request.use(async (request) => {
      return request;
    });
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosService.get(`https://skenass.com${url}`, config);
  }

  // async post<T>(
  //   url: string,
  //   data?: unknown,
  //   config?: AxiosRequestConfig
  // ): Promise<AxiosResponse<T>> {
  //   return this.axiosService.post(`${process.env.BASE_URL}`, data, config);
  // }

  async put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosService.put(`${process.env.BASE_URL}`, data, config);
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosService.delete(`${process.env.BASE_URL}`, config);
  }
}

const httpService = new HttpService();
export { httpService };
