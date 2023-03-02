import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant'
import ElementUI from 'element-ui'
import 'vant/lib/index.css'
import 'element-ui/lib/theme-chalk/index.css'
import { Notify, Dialog, Toast } from 'vant'
import store from './store'

Vue.use(Vant)
Vue.use(ElementUI)
Vue.use(Notify)
Vue.use(Dialog)
Vue.use(Toast)

Vue.config.productionTip = false
Vue.prototype.$EventBus = new Vue()

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App),
})
