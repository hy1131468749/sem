import axios from 'axios';
import global_config from '@/libs/global_config'
axios.defaults.timeout = 10000;   // 超时时间
axios.defaults.baseURL = global_config.httpUrl; // 默认地址
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
export default axios
