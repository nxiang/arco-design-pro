import { AnyObject } from '@/types/global';

type TargetContext = '_self' | '_parent' | '_blank' | '_top';

export const openWindow = (
  url: string,
  opts?: { target?: TargetContext; [key: string]: any }
) => {
  const { target = '_blank', ...others } = opts || {};
  window.open(
    url,
    target,
    Object.entries(others)
      .reduce((preValue: string[], curValue) => {
        const [key, value] = curValue;
        return [...preValue, `${key}=${value}`];
      }, [])
      .join(',')
  );
};

export const regexUrl = new RegExp(
  '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
  'i'
);

/** obj转formData */
export const objToFormData = (obj?: AnyObject) => {
  const formData = new FormData();
  if (!obj) return formData;
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    formData.append(key, value);
  });
  return formData;
};

const mapCacheKey = 'mapCacheKey';
let map: AnyObject = {};
try {
  map = JSON.parse(sessionStorage.getItem(mapCacheKey) || '{}');
} catch (error) {
  console.error('error', error);
}

interface CacheApi {
  <T extends (...args: any) => any>(cacheKey: string, api: T): (
    ...args: Parameters<T>
  ) => Promise<ReturnType<T>>;
}
/** 因1688调用限制，需缓存部分api结果以节省调用次数 */
export const cacheApi: CacheApi = (cacheKey, api) => {
  return async (...args) => {
    const key = [cacheKey, JSON.stringify(args)].join('-');
    if (map[key]) return map[key];
    const result = await Promise.resolve(api.apply(this, args));
    map[key] = result;
    sessionStorage.setItem(mapCacheKey, JSON.stringify(map));
    return result;
  };
};
