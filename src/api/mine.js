import request from '@/utils/request'

// 我的数据
export function mineNum() {
  return request({
    url: '/system/mine/num',
    method: 'get',
  })
}

// 我的信息
export function mineInfo() {
  return request({
    url: '/system/mine/info',
    method: 'get',
  })
}

// 修改我的信息
export function mineEdit(params) {
  return request({
    url: '/system/mine/edit',
    method: 'post',
    data: params,
  })
}
