import { loginAPI, getProfileAPI } from '@/api/user'
import { setToken, getToken, removeToken } from '@/utils/auth'
import { TOKEN_KEY } from '@/constants/KEY'
export default {
  namespaced: true,
  state: () => {
    return {
      token: getToken() || '',
      // 权限
      profile: {}
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      setToken(token)
    },
    clearUserInfo(state) {
      state.token = ''
      removeToken(TOKEN_KEY)
      state.profile = {}
    },
    // 添加权限
    setProfile(state, profile) {
      state.profile = profile
    }
  },
  actions: {
    async doLogin(ctx, { username, password }) {
      const res = await loginAPI({ username, password })
      ctx.commit('setToken', res.data.token)
    },
    async getProfile(context) {
      const res = await getProfileAPI()
      context.commit('setProfile', res.data)
      return res.data.permissions
    }
  }
}
