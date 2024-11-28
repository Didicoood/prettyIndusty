import router from './router'
import { getToken } from './utils/auth'
const WHITE_LIST = ['/login', '404']
router.beforeEach((to, from, next) => {
  const token = getToken()
  if (token) {
    next()
  } else {
    if (WHITE_LIST.includes(to.path)) next()
    next('/login')
  }
})
