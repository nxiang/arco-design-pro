import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Message } from '@arco-design/web-vue';
// import { useUserStore } from '@/store';
import { getToken } from '@/utils/auth';
import { HttpResponse1688 } from '@/types/global';

export interface HttpResponse<T = unknown> {
  status: number;
  msg: string;
  code: number;
  data: T;
}

if (import.meta.env.VITE_API_BASE_URL) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
}

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // let each request carry token
    // this example using the JWT token
    // Authorization is a custom headers key
    // please modify it according to the actual situation
    // const token = getToken();
    // if (token) {
    //   if (!config.headers) {
    //     config.headers = {};
    //   }
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    let token;
    try {
      // 尝试从缓存中取token
      token = JSON.parse(getToken() as string)?.access_token;
    } catch (error) {
      console.error('error', error);
    }

    // 传参时formData的话
    if (config.data instanceof FormData) {
      // Content-Type写为multipart/form-data
      if (config.headers) {
        config.headers['Content-Type'] = 'multipart/form-data';
      }
      // 缓存中有token的话，自动带上
      if (token) {
        config.data.append('access_token', token);
      }
    }

    return config;
  },
  (error) => {
    // do something
    return Promise.reject(error);
  }
);
// add response interceptors
axios.interceptors.response.use(
  (response: AxiosResponse<HttpResponse1688>) => {
    // console.log('response', response);
    if (
      response?.request?.responseURL?.includes?.(
        'https://gw.open.1688.com/openapi'
      )
    ) {
      // 授权相关接口，直接返回
      return response;
    }
    // 其它接口，目前禁用1688，取result返回
    const result = response?.data;
    return result;
    // if the custom code is not 20000, it is judged as an error.
    // if (res.code !== 20000) {
    //   Message.error({
    //     content: res.msg || 'Error',
    //     duration: 5 * 1000,
    //   });
    //   // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
    //   if (
    //     [50008, 50012, 50014].includes(res.code) &&
    //     response.config.url !== '/api/user/info'
    //   ) {
    //     Modal.error({
    //       title: 'Confirm logout',
    //       content:
    //         'You have been logged out, you can cancel to stay on this page, or log in again',
    //       okText: 'Re-Login',
    //       async onOk() {
    //         const userStore = useUserStore();

    //         await userStore.logout();
    //         window.location.reload();
    //       },
    //     });
    //   }
    //   return Promise.reject(new Error(res.msg || 'Error'));
    // }
    // return res;
  },
  (error) => {
    Message.error({
      content: error.msg || 'Request Error',
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);
