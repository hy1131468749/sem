import axios from 'axios';
import qs from 'qs'
import global_config from '@/libs/global_config'
axios.defaults.withCredentials = true
axios.defaults.timeout = 10000;   // 超时时间
axios.defaults.baseURL = global_config.httpUrl; // 默认地址
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.paramsSerializer = params => { return qs.stringify(params, { indices: false });};
// transformRequest这只适用于请求方法'PUT'，'POST'和'PATCH'
axios.defaults.transformRequest = data => {return qs.stringify(data, { indices: false });};
export default axios
