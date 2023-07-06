import axios from 'axios';
import { setToken } from '.';

const splitStr = '?code=';

const appKey = '1114888';

const appSecret = '90cXjUoNuowh';

const redirectUri = `${window.location.origin}/bind/1688-bind`;

/** 1688登录 */
export const getToken = async () => {
  const href = window.location.href;
  // 页面url不带code的话，就跳转1688去换
  if (!href.includes(splitStr)) {
    const url = `https://auth.1688.com/oauth/authorize?client_id=${appKey}&site=1688&redirect_uri=${redirectUri}`;
    window.location.replace(url);
    return;
  }
  try {
    // 通过code去换access_token
    const url = new URL(href);
    const searchParams = url.searchParams;
    const code = searchParams.get('code');
    const requestUrl = `https://gw.open.1688.com/openapi/http/1/system.oauth2/getToken/${appKey}?grant_type=authorization_code&need_refresh_token=true&client_id=${appKey}&client_secret=${appSecret}&redirect_uri=${redirectUri}&code=${code}`;
    const res = await axios.post(requestUrl);
    console.log('res123', res);
    if (res.data) {
      // 缓存token信息
      setToken(JSON.stringify(res.data));
      const { access_token: token } = res.data;
      return token as string;
    }
  } catch (error) {
    console.log('res123 error', error);
    // 接口出错，尝试重试
    // window.location.replace(redirectUri);
  }
};

export const a = 'a';
