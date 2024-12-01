import { contantsRoutes, resetRouter } from '@/router'
export default {
  namespaced: true,
  state: () => {
    return {
      menuList: [...contantsRoutes]
    }
  },
  mutations: {
    setMenuList(state, filterRoutes) {
      state.menuList = [...state.menuList, ...filterRoutes]
    },
    resetMenu(state) {
      // 重置左侧菜单
      state.menuList = contantsRoutes
      // 重置路由系统
      resetRouter()
    }
  }
}
