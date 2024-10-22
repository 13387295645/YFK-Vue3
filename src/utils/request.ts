// 对axios函数库进行二次封装
// 二次封装的目的是什么
// 目的1：利用axios请求，响应拦截器功能
// 目的2：请求拦截器，一般可以在请求头中携带公共参数：token
// 目的3：响应拦截器，可以简化服务器返回的参数，处理http网络错误
import axios from "axios";
import { ElMessage } from "element-plus";
import useUserStore from "@/store/modules/user";

// 利用axios.create方法创建一个axios实例：可以设计基础路径，超时的时间设置
const request = axios.create({
  baseURL: '/api',//请求的基础路径设置
  timeout: 5000  //超出时间的设置
});

// 请求拦截器
request.interceptors.request.use((config) => {
  // 获取公共仓库
  let userStore = useUserStore()

  // token:公共参数，如果用户登录了需要携带
  if (userStore.userInfo.token) {
    config.headers.token = userStore.userInfo.token;
  }
  // config:请求拦截器回调注入的对象（配置对象），配置对象的身上最重要的一件事情header属性
  // 可以通过请求头携带公共参数-token
  return config
});

// 响应拦截器
request.interceptors.response.use((response) => {
  // 响应拦截器成功的回调，一般会进行简化数据
  return response.data
}, (error) => {
  // 处理http网络错误
  let status = error.response.status;
  console.log(error);
  switch (status) {
    case 404:
      ElMessage({
        type: 'error',
        message: '请求路径问题'
      })
      break;
    case 500 | 501 | 502 | 503 | 504 | 505:
      ElMessage({
        type: 'error',
        message: '服务器挂了'
      })
      break;
    case 401:
      ElMessage({
        type: 'error',
        message: '参数有误'
      })
      break;
  }
  return Promise.reject(new Error(error.message))
})

// 暴露axios
export default request;