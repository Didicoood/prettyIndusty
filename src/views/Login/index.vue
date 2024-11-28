<template>
  <div class="login_body">
    <div class="bg" />
    <div class="box">
      <div class="title">智慧园区-登录</div>
      <el-form ref="form" :model="formData" :rules="rules">
        <el-form-item

          label="账号"
          prop="username"
        >
          <el-input v-model="formData.username" />
        </el-form-item>

        <el-form-item

          label="密码"
          prop="password"
        >
          <el-input v-model="formData.password" />
        </el-form-item>

        <el-form-item prop="remember">
          <el-checkbox v-model="formData.remember">记住我</el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" class="login_btn" @click="doLogin()">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
const FORMDATA_KEY = 'form_key'
export default {
  name: 'Login',
  data() {
    return {
      formData: {
        username: '',
        password: '',
        remember: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    this.rememberUser()
  },
  methods: {
    doLogin() {
      this.$refs.form.validate(async(valid) => {
        if (valid) {
          const { username, password } = this.formData
          await this.$store.dispatch('user/doLogin', { username, password })

          // 判断记住我
          if (this.formData.remember) {
            localStorage.setItem(FORMDATA_KEY, JSON.stringify({ username, password }))
          } else {
            localStorage.removeItem(FORMDATA_KEY)
          }
          this.$router.push('/')
        }
      })
    }
  },
  rememberUser() {
    const cacheFormStr = localStorage.getItem(FORMDATA_KEY)
    if (cacheFormStr) {
      const cacheFormData = JSON.parse(cacheFormStr)
      this.formData.username = cacheFormData.username
      this.formData.password = cacheFormData.password
    }
  }
}

</script>

<style scoped lang="scss">
  .login_body {
    display: flex;
  }
  .bg {
    width: 60vw;
    height: 100vh;
    background: url('~@/assets/login-bg.svg') no-repeat;
    background-position: right top;
    background-size: cover;
  }
  .box {
    margin: 200px 10% 0;
    flex: 1;
    .title {
      padding-bottom: 76px;
      font-size: 26px;
      font-weight: 500;
      color: #1e2023;
    }
    ::v-deep() {
      .ant-form-item {
        display: flex;
        margin-bottom: 62px;
        flex-direction: column;
      }
      .ant-form-item-label label {
        font-size: 16px;
        color: #8b929d;
      }
      .ant-input,
      .ant-input-password {
        border-radius: 8px;
      }
    }
  }
  .login_btn{
    width: 100%;
  }
</style>
