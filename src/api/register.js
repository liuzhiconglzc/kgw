import request from '@/utils/request'

// 注册验证码
export function captchaImage() {
  return request({
    url: '/api/system/captchaImage',
    method: 'get',
  })
}

// 注册
export function register(params) {
  return request({
    url: '/api/system/register',
    method: 'post',
    data: params,
  })
}