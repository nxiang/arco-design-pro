import {
  ProductDetailListParams,
  ProductDetailListResponse,
  ProductListParams,
  ProductListResponse,
} from '@/types/api/1688/fenxiao';
import { cacheApi, objToFormData } from '@/utils';
import axios from 'axios';

/**
 * 精选货源商品列表查询
 * https://open.1688.com/api/apidocdetail.htm?id=com.alibaba.fenxiao:alibaba.pifatuan.product.list-1
 * @param data 查询参数
 * @returns
 */
export const productList = cacheApi(
  'productListCacheKey',
  (data?: ProductListParams) => {
    return axios.post(
      '/1688/api/param2/1/com.alibaba.fenxiao/alibaba.pifatuan.product.list',
      objToFormData(data)
    ) as ProductListResponse;
  }
);

/**
 * 精选货源商品详情批量查询
 * https://open.1688.com/api/apidocdetail.htm?id=com.alibaba.fenxiao:alibaba.pifatuan.product.detail.list-1
 * @param data 查询参数
 * @returns
 */
export const productDetailList = (data?: ProductDetailListParams) => {
  return axios.post(
    '/1688/api/param2/1/com.alibaba.fenxiao:alibaba.pifatuan.product.detail.list',
    objToFormData(data)
  ) as ProductDetailListResponse;
};
