import request from '@/utils/request'

// 注册验证码
export function captchaImage() {
  return request({
    url: '/captchaImage',
    method: 'get',
  })
}

// 注册
export function register(params) {
  return request({
    url: '/register',
    method: 'post',
    data: params,
  })
}