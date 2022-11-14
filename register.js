import request from '@/utils/request'

// 注册验证码
export function captchaImage() {
  return request({
    url: '/captchaImage',
    method: 'get'
  })
}
// 提交注册申请
export function postRegmse(params){
  return request({
    // url: '/register',
    url:'http://httpbin.org/post',
    method: 'post',
    data:params,
  })
}
