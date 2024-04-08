//处理请求拦截和响应拦截

//引入

import axios  from "axios";
import { config } from "dotenv";


//判断一下用户是否登录

function getToken(){ //获取token
  return sessionStorage.getItem('token')
}

//3创建axios实例

let service = axios.create({
  baseURL:"/api",
  timeout:6000,
  withCredentials:true
})

//4创建请求拦截和响应拦截
  service.interceptors.request.use(
    //成功
    config=>{
      if(getToken()){
        config.headers['token']=getToken();
      }
      //返回
      return config
    },
    //错误
    err=>{
      return Promise.reject(err)
    }
  )
  //响应拦截
  service.interceptors.response.use(
    //成功
    response=>{
      
      let res = response.data
      if(res.code=='401'){
        window.location.href='/login'
      }
      return Promise.resolve(res)
    },
    //错误
    err=>{
      return Promise.reject(err)
    }
  )

  export default service