import request from '@/utils/request'

// 登录
export function login(params) {
  return request({
    url: '/login',
    headers: {
      isToken: false,
    },
    method: 'post',
    data: params,
  })
}

// 忘记密码
export function password(params) {
  return request({
    url: '/api/system/mine/forgetpw',
    method: 'post',
    data: params,
  })
}
