<template>
  <div class="add-enterprise">
    <header class="add-header">
      <div class="left">
        <!-- <span class="arrow" @click="$router.back()"><i class="el-icon-arrow-left" />返回</span>
        <span>|</span> -->
        <el-page-header
          :content="`${id? '编辑企业' : '添加企业'}`"
          @back="$router.back()"
        />
      </div>
      <div class="right">
        黑马程序员
      </div>
    </header>
    <main class="add-main">
      <div class="form-container">
        <div class="title">企业信息</div>
        <div class="form">
          <el-form ref="ruleForm" :model="addForm" :rules="addRules" label-width="100px">
            <el-form-item label="企业名称" prop="name">
              <el-input v-model="addForm.name" />
            </el-form-item>
            <el-form-item label="法人" prop="legalPerson">
              <el-input v-model="addForm.legalPerson" />
            </el-form-item>
            <el-form-item label="注册地址" prop="registeredAddress">
              <el-input v-model="addForm.registeredAddress" />
            </el-form-item>
            <el-form-item label="所在行业" prop="industryCode">
              <el-select v-model="addForm.industryCode">
                <el-option
                  v-for="item in industryList"
                  :key="item.industryCode"
                  :value="item.industryCode"
                  :label="item.industryName"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="企业联系人" prop="contact">
              <el-input v-model="addForm.contact" />
            </el-form-item>
            <el-form-item label="联系电话" prop="contactNumber">
              <el-input v-model="addForm.contactNumber" />
            </el-form-item>
            <el-form-item label="营业执照" prop="businessLicenseId">
              <el-upload
                action="#"
                :http-request="uploadRequest"
                :before-upload="beforeUpload"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </main>
    <footer class="add-footer">
      <div class="btn-container">
        <el-button>重置</el-button>
        <el-button type="primary" @click="confirmSubmit">确定</el-button>
      </div>
    </footer>
  </div>
</template>

<script>
import { createExterpriseAPI, getEnterpriseDetailAPI, getIndustryListAPI, updateExterpriseAPI, uploadAPI } from '@/api/enterprise'
export default {
  data() {
    // 自定义校验手机号
    const validatePhone = (rule, value, callback) => {
      if (/^1[3-9]\d{9}$/.test(value)) callback()
      callback(new Error('请输入正常的手机号'))
    }
    return {
      addForm: {
        name: '', // 企业名称
        legalPerson: '', // 法人
        registeredAddress: '', // 注册地址
        industryCode: '', // 所在行业
        contact: '', // 企业联系人
        contactNumber: '', // 联系人电话
        businessLicenseUrl: '', // 营业执照url
        businessLicenseId: '' // 营业执照id
      },
      //   行业列表
      industryList: [],
      // 表单规则
      addRules: {
        name: [
          { required: true, message: '企业名称为必填', trigger: 'blur' }
        ],
        legalPerson: [
          { required: true, message: '法人为必填', trigger: 'blur' }
        ],
        registeredAddress: [
          { required: true, message: '注册地址为必填', trigger: 'blur' }
        ],
        industryCode: [
          { required: true, message: '所在行业为必填', trigger: 'change' }
        ],
        contact: [
          { required: true, message: '企业联系人为必填', trigger: 'blur' }
        ],
        contactNumber: [
          { required: true, message: '企业联系人电话为必填', trigger: 'blur' },
          { validator: validatePhone, trigger: 'blur' }
        ],
        businessLicenseId: [
          { required: true, message: '请上传营业执照', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    id() {
      return this.$route.query.id
    }
  },
  mounted() {
    this.getIndustryList()
    if (this.id) {
      this.getEnterpriseDetail()
    }
  },
  methods: {
    async getIndustryList() {
      const { data } = await getIndustryListAPI()
      this.industryList = data
    },
    async uploadRequest(data) {
      const file = data.file
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', 'businessLicense')
      const res = await uploadAPI(formData)
      //   回显的时候要用到
      this.addForm.businessLicenseId = res.data.id
      this.addForm.businessLicenseUrl = res.data.url
      //   单独校验
      this.$refs.ruleForm.validateField('businessLicenseId')
    },
    // 上传之前校验
    beforeUpload(file) {
      // 定义支持上传的文件(boolean)
      const allowImgType = ['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)
      // 限制大小(boolean)
      const isLt5M = file.size / 1024 / 1024 < 5
      if (!allowImgType) this.$message.error('上传合同图片只能是 PNG/JPG/JPEG 格式!')
      if (!isLt5M) this.$message.error('上传合同图片大小不能超过 5MB!')
      //   返回的Boolean代表能不能上传，true能，false不能
      return allowImgType && isLt5M
    },
    async confirmSubmit() {
      this.$refs.ruleForm.validate(async valid => {
        if (!valid) return
        try {
          if (this.id) await updateExterpriseAPI({ ...this.addForm, id: this.id })
          await createExterpriseAPI(this.addForm)
        } catch (e) {
          this.$message.error('添加失败')
        }
        this.$router.back()
      })
    },
    async getEnterpriseDetail() {
      const res = await getEnterpriseDetailAPI(this.id)
      const { businessLicenseId, businessLicenseUrl, contact, contactNumber, industryCode, legalPerson, name, registeredAddress } = res.data
      this.addForm = { businessLicenseId, businessLicenseUrl, contact, contactNumber, industryCode, legalPerson, name, registeredAddress }
    }
  }
}
</script>

  <style scoped lang="scss">
  .add-enterprise {
    background-color: #f4f6f8;
    height: 100vh;

    .add-header {
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      height: 64px;
      line-height: 64px;
      font-size: 16px;
      font-weight: bold;
      background-color: #fff;

      .left {
        span {
          margin-right: 4px;
        }
        .arrow{
          cursor: pointer;
        }
      }

      .right {
        text-align: right;
      }
    }

    .add-main {
      background: #f4f6f8;
      padding: 20px 130px;

      .form-container {
        background-color: #fff;
        .title {
          height: 60px;
          line-height: 60px;
          padding-left:20px;
        }
        .form {
          margin-bottom: 20px;
          padding: 20px 65px 24px;
          .el-form{
            display: flex;
            flex-wrap: wrap;
            .el-form-item{
              width: 50%;
            }
          }
        }
      }
    }

    .add-footer {
      position: fixed;
      bottom: 0;
      width: 100%;
      padding: 24px 50px;
      color: #000000d9;
      font-size: 14px;
      background: #fff;
      text-align: center;
    }
  }
  </style>
