import { http } from '../request/index'

export const getMvTop = (data) => {
  return http.get({ 
    url:'top/mv', 
    data
   })
}

// 根据id获取视频url
export const getMvUrlById = (data) => {
  return http.get({ 
    url:'mv/url', 
    data
   })
}

// 根据id获取视频详情
export const getMvDeatilById = (data) => {
  return http.get({ 
    url:'mv/detail', 
    data
   })
}

// 根据id获取更多视频
export const getRecommendById = (data) => {
  return http.get({ 
    url:'related/allvideo', 
    data
   })
}