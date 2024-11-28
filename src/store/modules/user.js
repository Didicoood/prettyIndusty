import { loginAPI } from '@/api/user'
import { setToken, getToken, removeToken } from '@/utils/auth'
import { TOKEN_KEY } from '@/constants/KEY'
export default {
  namespaced: true,
  state: () => {
    return {
      token: getToken() || ''
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
    }
  },
  actions: {
    async doLogin(ctx, { username, password }) {
      const res = await loginAPI({ username, password })
      ctx.commit('setToken', res.data.token)
    }
  }
}
