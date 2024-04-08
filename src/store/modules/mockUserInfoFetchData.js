//模拟前端的 AJAX请求返回数据
export const userInfoFetchData=function(){
  const data ={name:'小白',email:'1399474408@qq.com',phone:13345498764}
  return new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve(data)
      }, 2000);
  })
}
