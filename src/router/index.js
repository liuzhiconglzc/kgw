import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

Vue.use(Router)

const routes = [
  {
    path: '',
    redirect: 'index',
  },
  {
    path: '/index',
    name: 'Index',
    component: () => import('../view/index'),
    meta: {
      title: '砍瓜网',
    },
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import('../view/main'),
    meta: {
      title: '砍瓜网',
    },
    children: [
      {
        path: '/question',
        name: 'Question',
        component: () => import('../view/question'),
        meta: {
          title: '真实问题集',
          keepAlive: true,
        },
      },
      {
        path: '/list',
        name: 'List',
        component: () => import('../view/list'),
        meta: {
          keepAlive: true,
        },
      },
      {
        path: '/web',
        name: 'Web',
        component: () => import('../view/web'),
        meta: {
          title: '现实场景库',
          keepAlive: true,
        },
      },
      {
        path: '/detail/:proId',
        name: 'Detail',
        component: () => import('../view/detail'),
        meta: {
          title: '问题详情',
          keepAlive: true,
        },
      },
      {
        path: '/interview',
        name: 'Interview',
        component: () => import('../view/interview'),
        meta: {
          title: '问题详情',
        },
      },
      {
        path: '/mine',
        name: 'Mine',
        component: () => import('../view/mine'),
        meta: {
          title: '我的',
        },
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import('../view/login'),
        meta: {
          title: '登录',
        },
      },
      {
        path: '/register',
        name: 'Register',
        component: () => import('../view/register'),
        meta: {
          title: '注册',
        },
      },
      {
        path: '/add',
        name: 'Add',
        component: () => import('../view/add'),
        meta: {
          keepAlive: true,
        },
      },
      {
        path: '/manager',
        name: 'Manager',
        component: () => import('../view/manager'),
        meta: {
          title: '联系管理员',
        },
      },
    ],
  },
]

routes.forEach((route) => {
  route.path = route.path || '/' + (route.name || '')
})

const router = new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes,
})

const VueRouterPush = Router.prototype.push
Router.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch((err) => err)
}

router.beforeEach((to, from, next) => {
  NProgress.start()
  const title = to.meta && to.meta.title
  if (title) {
    document.title = title
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
