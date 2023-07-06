export interface AnyObject {
  [key: string]: any;
}

export interface Options {
  value: unknown;
  label: string;
}

export interface NodeOptions extends Options {
  children?: NodeOptions[];
}

export interface GetParams {
  body: null;
  type: string;
  url: string;
}

export interface PostData {
  body: string;
  type: string;
  url: string;
}

export interface Pagination {
  /** 当前的页数 */
  current: number;
  /** 每页展示的数据条数 */
  pageSize: number;
  /** 数据总数 */
  total?: number;
}

export interface ListData<T> {
  /** 列表加载项 */
  loading?: boolean;
  /** 列表数据源 */
  data: Array<T>;
}

export type TimeRanger = [string, string];

export interface GeneralChart {
  xAxis: string[];
  data: Array<{ name: string; value: number[] }>;
}

export interface HttpResponse1688 {
  /** 1688响应结果 */
  result: unknown;
}

/** 1688 api 正常响应 */
// export interface NormalResponse1688<T> {
// }

// /** 1688 api 响应 */
// export type Response1688<T> = Promise<NormalResponse1688<T>>;
