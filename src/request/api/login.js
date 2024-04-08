import service from "../service";

//login post
export function RequestPost(url,data){
  return new Promise((resolve,reject)=>{
    service.post(url,data).then(res=>resolve(res))
    .catch(error=>reject(error))
  })
}
//login get
export function RequestGet(url,params){
  return new Promise((resolve,reject)=>{
    service.get(url,{
      params
    }).then(res=>resolve(res))
    .catch(error=>reject(error))
  })
}