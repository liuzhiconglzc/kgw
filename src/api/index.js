import request from '@/utils/request'

// 首页数据
export function indexNum() {
  return request({
    url: '/api/system/index/num',
    method: 'get',
  })
}

// 发布问题调用接口
export function visitAdd() {
  return request({
    url: '/api/system/index/visitadd',
    method: 'get',
  })
}
