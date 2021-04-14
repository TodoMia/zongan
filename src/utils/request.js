import axios from "axios";
import { ElMessage } from "element-plus";
import router from "../router/index.js";
// create an axios instance   创建axios实例
let $message = ElMessage;

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api 的 base_url
  timeout: 5000, // request timeout  设置请求超时时间
  responseType: "json",
  // withCredentials: true, // 是否允许带cookie这些
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
});

service.interceptors.request.use(
  (config) => {
    // 若是有做鉴权token , 就给头部带上token
    // config.headers["token"] = getToken() || "";
    return config;
  },
  (error) => {
    // 对请求错误做些什么，自己定义
    console.log(error); // for debug
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  (response) => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    let code = response.data.code;
    if (code == 5001 && /失效/.test(response.data.msg)) {
      $message.error(response.data.msg);
      router.replace({
        path: "/",
        query: {
          redirect: router.currentRoute.fullPath,
        },
      });
    } else if (code == 403) {
      $message.error(response.data.msg);
      router.replace({
        path: "/",
        query: {
          redirect: router.currentRoute.fullPath,
        },
      });
    } else {
      return Promise.resolve(response.data);
    }
  },
  // 服务器状态码不是2开头的的情况
  // 这里可以跟你们的后台开发人员协商好统一的错误状态码
  // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
  // 下面列举几个常见的操作，其他需求可自行扩展
  (error) => {
    // console.log(error);
    if (error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          router.replace({
            path: "/",
            query: {
              redirect: router.currentRoute.fullPath,
            },
          });
          break;

        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token和清空vuex中token对象
        // 跳转登录页面
        case 500:
          $message.error("获取数据失败");
          router.replace({
            path: "/",
            query: {
              redirect: router.currentRoute.fullPath,
            },
          });
          break;
        case 404:
          $message.error("网络请求不存在");
          break;
        // 其他错误，直接抛出错误提示
        default:
          $message.error(error.response.data.message);
      }
      return Promise.reject(error.response);
    }
  }
);
export default function(url, method, params = {}, config = {}) {
  // 首先判断是get请求还是post请求
  let data = method.toLocaleLowerCase() === "get" ? "params" : "data";
  return service({
    method,
    url,
    [data]: params, // 差异点在于data的值
    config,
  })
    .then((res) => {
      return Promise.resolve(res);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
}
