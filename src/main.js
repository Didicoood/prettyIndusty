import Vue from 'vue'
import 'normalize.css/normalize.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'

import store from './store'

import router from './router'
import './permission'
// 注册svg
import '@/icons'

Vue.use(ElementUI)

Vue.config.productionTip = false

// 管理员权限特殊处理
const adminPerms = '*:*:*'
Vue.directive('auth-btn', {
  inserted(el, data) {
    // 在vuex拿到权限
    const perms = store.state.user.profile.permissions
    if (!perms.includes(data.value) && !perms.includes(adminPerms)) {
      el.remove()
    }
  }
})
// vue实例化
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
