import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

Vue.use(Router)

const routesM = [
  {
    path: '',
    redirect: 'index',
  },
  {
    path: '/index',
    name: 'Index',
    component: () => import('../view/mobile/index'),
    meta: {
      title: '砍瓜网',
    },
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import('../view/mobile/main'),
    meta: {
      title: '砍瓜网',
    },
    children: [
      {
        path: '/question',
        name: 'Question',
        component: () => import('../view/mobile/question'),
        meta: {
          title: '真实问题集',
          keepAlive: true,
        },
      },
      {
        path: '/list',
        name: 'List',
        component: () => import('../view/mobile/list'),
        meta: {
          keepAlive: true,
        },
      },
      {
        path: '/detail/:proId',
        name: 'Detail',
        component: () => import('../view/mobile/detail'),
        meta: {
          title: '问题详情',
          keepAlive: true,
        },
      },
      {
        path: '/interview',
        name: 'Interview',
        component: () => import('../view/mobile/interview'),
        meta: {
          title: '问题详情',
        },
      },
      {
        path: '/mine',
        name: 'Mine',
        component: () => import('../view/mobile/mine'),
        meta: {
          title: '我的',
        },
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import('../view/mobile/login'),
        meta: {
          title: '登录',
        },
      },
      {
        path: '/register',
        name: 'Register',
        component: () => import('../view/mobile/register'),
        meta: {
          title: '注册',
        },
      },
      {
        path: '/password',
        name: 'Password',
        component: () => import('../view/mobile/password'),
        meta: {
          title: '重置密码',
        },
      },
      {
        path: '/add',
        name: 'Add',
        component: () => import('../view/mobile/add'),
        meta: {
          keepAlive: true,
        },
      },
      {
        path: '/manager',
        name: 'Manager',
        component: () => import('../view/mobile/manager'),
        meta: {
          title: '联系管理员',
        },
      },
      {
        path: '/personal',
        name: 'Personal',
        component: () => import('../view/mobile/personal'),
        meta: {
          title: '个人设置',
        },
      },
    ],
  },
]

const routesP = [
  {
    path: '',
    redirect: 'index',
  },
  {
    path: '/index',
    name: 'Index',
    component: () => import('../view/pc/index'),
    meta: {
      title: '砍瓜网',
    },
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import('../view/pc/main'),
    meta: {
      title: '砍瓜网',
    },
    children: [
      {
        path: '/question',
        name: 'Question',
        component: () => import('../view/pc/question'),
        meta: {
          title: '真实问题集',
          keepAlive: true,
        },
      },
      {
        path: '/detail/:proId',
        name: 'Detail',
        component: () => import('../view/pc/detail'),
        meta: {
          title: '问题详情',
          keepAlive: true,
        },
      },
      {
        path: '/interview',
        name: 'Interview',
        component: () => import('../view/pc/interview'),
        meta: {
          title: '问题详情',
        },
      },
      {
        path: '/interviewa',
        name: 'Interviewa',
        component: () => import('../view/pc/interviewa'),
        meta: {
          title: '问题详情',
        },
      },
      {
        path: 'managera',
        name: 'Managera',
        component: () => import('../view/pc/managera'),
        meta: {
          title: '联系管理员',
        },
      },
      {
        path: '/mine',
        name: 'Mine',
        component: () => import('../view/pc/mine'),
        meta: {
          title: '我的',
        },
        children:[
          {
            path: '/manager',
            name: 'Manager',
            component: () => import('../view/pc/manager'),
            meta: {
              title: '联系管理员',
            },
          },
          {
            path: '/personal',
            name: 'Personal',
            component: () => import('../view/pc/personal'),
            meta: {
              title: '个人设置',
            },
          },
          {
            path: '/list',
            name: 'List',
            component: () => import('../view/pc/list'),
            meta: {
              keepAlive: true,
            },
          },
        ]
      },
      {
        path: '/login',
        name: 'Login',
        component: () => import('../view/pc/login'),
        meta: {
          title: '登录',
        },
      },
      {
        path: '/register',
        name: 'Register',
        component: () => import('../view/pc/register'),
        meta: {
          title: '注册',
        },
      },
      {
        path: '/password',
        name: 'Password',
        component: () => import('../view/pc/password'),
        meta: {
          title: '重置密码',
        },
      },
      {
        path: '/add',
        name: 'Add',
        component: () => import('../view/pc/add'),
        meta: {
          keepAlive: true,
        },
      },
    ],
  },
]

var routes = [];
if (navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
  routes = routesM
} else {
  routes = routesP
}

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
