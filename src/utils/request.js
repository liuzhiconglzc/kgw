// import axios from 'axios'
// import { getToken, removeToken } from '@/utils/auth'
// import cache from '@/plugins/cache'
// import { Dialog, Notify } from 'vant'
// import router from '@/router'
//
// // 是否显示重新登录
// export let isRelogin = { show: false }
//
// axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// // 创建axios实例
// const service = axios.create({
//   // axios中请求配置有baseURL选项，表示请求URL公共部分
//   baseURL: process.env.VUE_APP_BASE_API,
//   // 超时
//   timeout: 10000,
// })
//
// // request拦截器
// service.interceptors.request.use(
//   (config) => {
//     // 是否需要设置 token
//     const isToken = (config.headers || {}).isToken === false
//     // 是否需要防止数据重复提交
//     const isRepeatSubmit = (config.headers || {}).repeatSubmit === false
//     if (getToken() && !isToken) {
//       config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
//     }
//     // get请求映射params参数
//     if (config.method === 'get' && config.params) {
//       let url = config.url + '?' + tansParams(config.params)
//       url = url.slice(0, -1)
//       config.params = {}
//       config.url = url
//     }
//     if (
//       !isRepeatSubmit &&
//       (config.method === 'post' || config.method === 'put')
//     ) {
//       const requestObj = {
//         url: config.url,
//         data:
//           typeof config.data === 'object'
//             ? JSON.stringify(config.data)
//             : config.data,
//         time: new Date().getTime(),
//       }
//       const sessionObj = cache.session.getJSON('sessionObj')
//       if (
//         sessionObj === undefined ||
//         sessionObj === null ||
//         sessionObj === ''
//       ) {
//         cache.session.setJSON('sessionObj', requestObj)
//       } else {
//         const s_url = sessionObj.url // 请求地址
//         const s_data = sessionObj.data // 请求数据
//         const s_time = sessionObj.time // 请求时间
//         const interval = 1000 // 间隔时间(ms)，小于此时间视为重复提交
//         if (
//           s_data === requestObj.data &&
//           requestObj.time - s_time < interval &&
//           s_url === requestObj.url
//         ) {
//           const message = '数据正在处理，请勿重复提交'
//           console.warn(`[${s_url}]: ` + message)
//           return Promise.reject(new Error(message))
//         } else {
//           cache.session.setJSON('sessionObj', requestObj)
//         }
//       }
//     }
//     return config
//   },
//   (error) => {
//     console.log(error)
//     Promise.reject(error)
//   }
// )
//
// // 响应拦截器
// service.interceptors.response.use(
//   (res) => {
//     process.env.NODE_ENV == 'development' && console.log('response:', res.data)
//     // 未设置状态码则默认成功状态
//     const code = res.data.code || 200
//     // 获取错误信息
//     const msg = res.data.msg
//     // 二进制数据则直接返回
//     if (
//       res.request.responseType === 'blob' ||
//       res.request.responseType === 'arraybuffer'
//     ) {
//       return res.data
//     }
//     if (code == 401) {
//       let msg
//       if (getToken()) {
//         msg = '登录状态已过期，请问是否重新登录？'
//       } else {
//         msg = '您暂未登录，请问是否登录？'
//       }
//       removeToken()
//       Dialog.alert({
//         showCancelButton: true,
//         cancelButtonText: '否',
//         confirmButtonText: '是',
//         message: msg,
//       })
//         .then(() => {
//           router.push({ path: '/login' })
//         })
//         .catch(() => {})
//       return Promise.reject(new Error(msg))
//     } else if (code == 500) {
//       Notify(msg)
//       return Promise.reject(new Error(msg))
//     } else if (code !== 500||code !== 200) {
//       // Notify(msg)
//       return res.data
//     }else {
//       return res.data
//     }
//   },
//   (error) => {
//     console.log('error:' + error)
//     Notify(error.message || '接口异常')
//     return Promise.reject(error)
//   }
// )
//
// /**
//  * 参数处理
//  * @param {*} params  参数
//  */
// export function tansParams(params) {
//   let result = ''
//   for (const propName of Object.keys(params)) {
//     const value = params[propName]
//     var part = encodeURIComponent(propName) + '='
//     if (value !== null && typeof value !== 'undefined') {
//       if (typeof value === 'object') {
//         for (const key of Object.keys(value)) {
//           if (value[key] !== null && typeof value[key] !== 'undefined') {
//             let params = propName + '[' + key + ']'
//             var subPart = encodeURIComponent(params) + '='
//             result += subPart + encodeURIComponent(value[key]) + '&'
//           }
//         }
//       } else {
//         result += part + encodeURIComponent(value) + '&'
//       }
//     }
//   }
//   return result
// }
//
// export default service
import axios from 'axios'
import { getToken, removeToken } from '@/utils/auth'
import cache from '@/plugins/cache'
import { Dialog, Notify } from 'vant'
import router from '@/router'

// 是否显示重新登录
export let isRelogin = { show: false }

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    baseURL: process.env.VUE_APP_BASE_API,
    // 超时
    timeout: 10000,
})

// request拦截器
service.interceptors.request.use(
    (config) => {
        // 是否需要设置 token
        const isToken = (config.headers || {}).isToken === false
        // 是否需要防止数据重复提交
        const isRepeatSubmit = (config.headers || {}).repeatSubmit === false
        if (getToken() && !isToken) {
            config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
        }
        // get请求映射params参数
        if (config.method === 'get' && config.params) {
            let url = config.url + '?' + tansParams(config.params)
            url = url.slice(0, -1)
            config.params = {}
            config.url = url
        }
        if (
            !isRepeatSubmit &&
            (config.method === 'post' || config.method === 'put')
        ) {
            const requestObj = {
                url: config.url,
                data:
                    typeof config.data === 'object'
                        ? JSON.stringify(config.data)
                        : config.data,
                time: new Date().getTime(),
            }
            const sessionObj = cache.session.getJSON('sessionObj')
            if (
                sessionObj === undefined ||
                sessionObj === null ||
                sessionObj === ''
            ) {
                cache.session.setJSON('sessionObj', requestObj)
            } else {
                const s_url = sessionObj.url // 请求地址
                const s_data = sessionObj.data // 请求数据
                const s_time = sessionObj.time // 请求时间
                const interval = 1000 // 间隔时间(ms)，小于此时间视为重复提交
                if (
                    s_data === requestObj.data &&
                    requestObj.time - s_time < interval &&
                    s_url === requestObj.url
                ) {
                    const message = '数据正在处理，请勿重复提交'
                    console.warn(`[${s_url}]: ` + message)
                    return Promise.reject(new Error(message))
                } else {
                    cache.session.setJSON('sessionObj', requestObj)
                }
            }
        }
        return config
    },
    (error) => {
        console.log(error)
        Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    (res) => {
        process.env.NODE_ENV == 'development' && console.log('response:', res.data)
        // 未设置状态码则默认成功状态
        const code = res.data.code || 200
        // 获取错误信息
        const msg = res.data.msg
        // 二进制数据则直接返回
        if (
            res.request.responseType === 'blob' ||
            res.request.responseType === 'arraybuffer'
        ) {
            return res.data
        }
        if (code == 401) {
            let msg
            if (getToken()) {
                msg = '登录状态已过期，请问是否重新登录？'
            } else {
                msg = '您暂未登录，请问是否登录？'
            }
            removeToken()
            Dialog.alert({
                showCancelButton: true,
                cancelButtonText: '否',
                confirmButtonText: '是',
                message: msg,
            })
                .then(() => {
                    router.push({ path: '/login' })
                })
                .catch(() => {})
            return Promise.reject(new Error(msg))
        } else if (code !== 200) {
            Notify(msg)
            return Promise.reject(new Error(msg))
        } else {
            return res.data
        }
    },
    (error) => {
        console.log('error:' + error)
        Notify(error.message || '接口异常')
        return Promise.reject(error)
    }
)

/**
 * 参数处理
 * @param {*} params  参数
 */
export function tansParams(params) {
    let result = ''
    for (const propName of Object.keys(params)) {
        const value = params[propName]
        var part = encodeURIComponent(propName) + '='
        if (value !== null && typeof value !== 'undefined') {
            if (typeof value === 'object') {
                for (const key of Object.keys(value)) {
                    if (value[key] !== null && typeof value[key] !== 'undefined') {
                        let params = propName + '[' + key + ']'
                        var subPart = encodeURIComponent(params) + '='
                        result += subPart + encodeURIComponent(value[key]) + '&'
                    }
                }
            } else {
                result += part + encodeURIComponent(value) + '&'
            }
        }
    }
    return result
}

export default service
