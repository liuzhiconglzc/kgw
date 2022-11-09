import request from '@/utils/request'

// 我的数据
export function mineNum() {
  return request({
    url: '/system/mine/num',
    method: 'get',
  })
}
