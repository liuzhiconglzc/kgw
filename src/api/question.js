import request from '@/utils/request'

// 问题分类
export function typeList() {
  return request({
    url: '/api/system/type/list',
    method: 'get',
  })
}

// 专业分类
export function classifyList() {
  return request({
    url: '/api/system/field/list',
    method: 'get',
  })
}

// // 问题列表
// export function questionList(params) {
//   return request({
//     url: '/api/system/pro/list',
//     method: 'get',
//     params,
//   })
// }

// v2版本问题列表
export function questionList(params) {
  return request({
    url: '/api/system/prov2/list',
    method: 'get',
    params,
  })
}

// // 问题详情
// export function questionDetail(id) {
//   return request({
//     url: `/api/system/pro/${id}`,
//     method: 'get',
//   })
// }

// v2问题详情
export function questionDetail(id) {
  return request({
    url: `/api/system/prov2/${id}`,
    method: 'get',
  })
}

// // 问题新增
// export function questionAdd(data) {
//   return request({
//     url: '/system/pro/add',
//     method: 'post',
//     data,
//   })
// }

// v2问题新增
export function questionAdd(data) {
  return request({
    url: '/system/prov2/add',
    method: 'post',
    data,
  })
}

// // 问题修改
// export function questionUpdate(data) {
//   return request({
//     url: '/system/pro/update',
//     method: 'post',
//     data,
//   })
// }

// v2问题修改
export function questionUpdate(data) {
  return request({
    url: '/system/prov2/update',
    method: 'post',
    data,
  })
}

// 问题删除
export function questionDelete(id) {
  return request({
    url: `/system/pro/delete/${id}`,
    method: 'get',
  })
}

// 问题回复
export function questionReply(data) {
  return request({
    url: '/system/answer/add',
    method: 'post',
    data,
  })
}

// 上传图片
export function uploadImage(data) {
  let formData = new FormData()
  formData.append('imagefile', data)
  return request({
    url: '/system/upload/image',
    method: 'post',
    data: formData,
  })
}

// 点赞
export function likeAdd(id) {
  return request({
    url: `/system/like/add?proId=${id}`,
    method: 'post',
  })
}

// 点赞取消
export function likeCancel(id) {
  return request({
    url: `/system/like/cancel?proId=${id}`,
    method: 'post',
  })
}

// 收藏
export function collectAdd(id) {
  return request({
    url: `/system/collect/add?proId=${id}`,
    method: 'post',
  })
}

// 收藏取消
export function collectCancel(id) {
  return request({
    url: `/system/collect/cancel?proId=${id}`,
    method: 'post',
  })
}
