import router from './router'
import { getToken } from './utils/auth'
import store from '@/store'
import { asyncRoutes } from './router'
const WHITE_LIST = ['/login', '404']
// 处理一级路由菜单权限
const getFirstRoutePerms = (permsArr) => {
  const newArr = permsArr.map(item => {
    return item.split(':')[0]
  })
  return [...new Set(newArr)]
}
// 处理二级路由菜单权限
const getSecondRoutePerms = (permsArr) => {
  const newArr = permsArr.map(item => {
    const arr = item.split(':')
    return `${arr[0]}:${arr[1]}`
  })
  return [...new Set(newArr)]
}
// 根据权限标识过滤路由表
function getRoutes(firstRoutePerms, secondRoutePerms, asyncRoutes) {
  // 根据一级和二级对动态路由表做过滤 return出去过滤之后的路由表
  // 1. 根据一级路由对动态路由表做过滤
  return asyncRoutes.filter(route => {
    return firstRoutePerms.includes(route.permission)
  }).map(item => {
    // 2. 对二级路由做过滤
    return {
      ...item,
      children: item.children.filter(item => secondRoutePerms.includes(item.permission))
    }
  })
}
router.beforeEach(async(to, from, next) => {
  const token = getToken()
  if (token) {
    next()
    if (!store.state.user.profile.id) {
      // 1、获取原始权限列表
      const permissions = await store.dispatch('user/getProfile')
      // 2、一级路由菜单
      const firstRoutePerms = getFirstRoutePerms(permissions)
      console.log(firstRoutePerms)

      // 2、 二级路由菜单
      const secondRoutePerms = getSecondRoutePerms(permissions)
      console.log(secondRoutePerms)
      // 3、根据菜单权限过滤一级和二级
      const filterRoutes = getRoutes(firstRoutePerms, secondRoutePerms, asyncRoutes)
      // 4.动态添加路由
      filterRoutes.forEach(route => {
        router.addRoute(route)
      })
      // 5、存入vuex,后续渲染
      store.commit('menu/setMenuList', filterRoutes)
      // 6、在组件中拿vuex的数据渲染
    }
  } else {
    if (WHITE_LIST.includes(to.path)) { next() } else {
      next('/login')
    }
  }
})
