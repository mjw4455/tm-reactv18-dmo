import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  Canceler,
  CreateAxiosDefaults,
} from "axios";
import qs from "qs";
import { message } from "antd";

export interface Interceptor {
  requestSuccess?: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig | Promise<AxiosRequestConfig>;
  requestError?: (error: AxiosError) => AxiosError | Promise<AxiosError>;
  responseSuccess?: (
    response: AxiosResponse
  ) => AxiosResponse | Promise<AxiosResponse>;
  responseError?: (error: AxiosError) => AxiosError | Promise<AxiosError>;
}

export class BaseAxios {
  public loading: boolean = false;
  public instance: AxiosInstance;
  private interceptors: Interceptor[] = [];
  private defaultInterceptors: Interceptor[] = [];
  private requestMap: Map<string, Canceler> = new Map();

  constructor(config: CreateAxiosDefaults) {
    this.instance = axios.create(config);
    this.addDefaultInterceptors({
      requestSuccess: (config) => {
        this.removeRequest(config);
        this.addRequest(config);
        return config;
      },
      requestError: (error) => Promise.reject(error),
      responseSuccess: (response) => {
        const map = this.removeRequest(response.config);
        map.size === 0 && (this.loading = false);
        return response;
      },
      responseError: (error) => Promise.reject(error),
    });
  }

  //设置默认拦截器
  private addDefaultInterceptors(interceptors: Interceptor) {
    this.defaultInterceptors.push(interceptors);
    this.setInterceptors();
  }

  //添加新拦截器
  public addInterceptors(interceptors: Interceptor) {
    this.interceptors.push(interceptors);
    this.setInterceptors();
  }

  //取消重复请求
  public getSecretKey(config: AxiosRequestConfig) {
    const { url, method, params } = config;
    return [url, method, qs.stringify(params)].join("&");
  }

  public addRequest(config: AxiosRequestConfig) {
    this.loading = true;
    const secretKey = this.getSecretKey(config);
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((cancel: Canceler) => {
        if (!this.requestMap.has(secretKey)) {
          this.requestMap.set(secretKey, cancel);
        }
      });
  }

  public removeRequest(config: AxiosRequestConfig) {
    const secretKey = this.getSecretKey(config);
    if (this.requestMap.has(secretKey)) {
      const cancelFn = this.requestMap.get(secretKey);
      cancelFn && cancelFn(secretKey);
      this.requestMap.delete(secretKey);
    }
    return this.requestMap;
  }
  //设置拦截器
  public setInterceptors() {
    this.instance.interceptors.request.clear();
    this.instance.interceptors.response.clear();

    const allInterceptors = [...this.defaultInterceptors, ...this.interceptors];

    // 请求拦截器
    this.instance.interceptors.request.use(
      (config) =>
        allInterceptors.reduce(
          (preConfig, newCeptors) =>
            (newCeptors.requestSuccess
              ? newCeptors.requestSuccess(preConfig)
              : preConfig) as InternalAxiosRequestConfig<any>,
          config
        ),
      (err) =>
        allInterceptors.reduce(
          (preErr, newCeptors) =>
            newCeptors.requestError ? newCeptors.requestError(preErr) : preErr,
          err
        )
    );

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response) =>
        allInterceptors.reduce(
          (preResponse, newCeptors) =>
            (newCeptors.responseSuccess
              ? newCeptors.responseSuccess(preResponse)
              : preResponse) as AxiosResponse<any, any>,
          response
        ),
      (err) =>
        allInterceptors.reduce(
          (preErr, newCeptors) =>
            newCeptors.responseError
              ? newCeptors.responseError(preErr)
              : preErr,
          err
        )
    );
  }
  public post<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance({
      url,
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      ...config,
    });
  }
  public get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance({
      url,
      method: "get",
      ...config,
    });
  }
}

const uesAxios = new BaseAxios({
  baseURL: "/",
  timeout: 5000,
  timeoutErrorMessage: "请求超时",
  withCredentials: true,
});

uesAxios.addInterceptors({
  responseSuccess: (response: AxiosResponse) => {
    const data = response.data;
    if (data.code == "40001") {
      window.location.href = "/login";
    }
    if (data.code !== 200) {
      message.error(data.message);
    }
    return response;
  },
});

export default uesAxios;
