import { objToFormData } from '@/utils';
import axios from 'axios';

interface ProductFollowParams {
  /** 商品id */
  productId: string;
}

type ProductFollowResponse = Promise<{
  /** code:0，表示成功 */
  code: number;
  /** 结果的描述 */
  message: string;
}>;

/**
 * 关注商品
 * https://open.1688.com/api/apidocdetail.htm?id=com.alibaba.product:alibaba.product.follow-1
 * @param data 查询参数
 * @returns
 */
export const productFollow = (data?: ProductFollowParams) => {
  return axios.post(
    '/1688/api/param2/1/com.alibaba.fenxiao/alibaba.product.follow',
    objToFormData(data)
  ) as ProductFollowResponse;
};
