<template>
  <div class="building-container">
    <!-- 搜索区域 -->
    <div class="search-container">
      <div class="search-label">企业名称：</div>
      <el-input v-model="params.name" clearable placeholder="请输入内容" class="search-main" />
      <el-button type="primary" @click="doSearch">查询</el-button>
    </div>
    <div class="create-container">
      <el-button type="primary" @click="$router.push('/exterpriseAdd')">添加企业</el-button>
    </div>
    <!-- 表格区域 -->
    <div class="table">
      <el-table style="width: 100%" :data="exterpriseList" @expand-change="expandHandle">
        <el-table-column
          type="expand"
        >
          <template #default="{row}">
            <el-table :data="row.rentList">
              <el-table-column label="租赁楼宇" width="320" prop="buildingName" />
              <el-table-column label="租赁起始时间" prop="startTime" />
              <el-table-column label="合同状态" prop="status">
                <template #default="scope">
                  <el-tag :type="formatInfoType(scope.row.status)">
                    {{ formartStatus(scope.row.status) }}
                  </el-tag>
                </template>

              </el-table-column>
              <el-table-column label="操作" width="180" fixed="right">
                <template #default="scope">
                  <el-button size="mini" type="text" :disabled="scope.row.status === 3" @click="outRent(scope.row.id)">退租</el-button>
                  <el-button size="mini" type="text" :disabled="scope.row.status !== 3">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column type="index" label="序号" />
        <el-table-column label="企业名称" width="320" prop="name" />
        <el-table-column label="联系人" prop="contact" />
        <el-table-column
          label="联系电话"
          prop="contactNumber"
        />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="mini" type="text" @click="addRent(scope.row.id)">添加合同</el-button>
            <el-button size="mini" type="text" @click="check(scope.row.id)">查看</el-button>
            <el-button size="mini" type="text" @click="editRent(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="text" @click="delExterprise(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-container">
      <el-pagination
        layout="total, prev, pager, next"
        :total="total"
        :page-size="params.pageSize"
        :current-page.sync="currentPage"
        @current-change="pageChange"
      />
    </div>
    <el-dialog
      title="添加合同"
      :visible="rentDialogVisible"
      width="580px"
      @close="closeDialog"
    >
      <!-- 表单 -->
      <div class="form-container">
        <!-- TODO -->
        <el-form ref="addForm" :model="rentForm" :rules="rentRules" label-position="top">
          <el-form-item label="租赁楼宇" prop="buildingId">
            <el-select v-model="rentForm.buildingId" placeholder="请选择">
              <el-option
                v-for="item in buildList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="租赁起止日期" prop="rentTime">
            <el-date-picker
              v-model="rentForm.rentTime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
          <el-form-item
            label="租赁合同"
            prop="contractId"
          >
            <el-upload
              action="#"
              :http-request="uploadHandle"
            >

              <el-button size="small" type="primary" plain>上传合同文件</el-button>
              <div slot="tip" class="el-upload__tip">支持扩展名：.doc .docx .pdf, 文件大小不超过5M</div>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <el-button size="mini" @click="closeDialog">取 消</el-button>
        <el-button size="mini" type="primary" @click="confirmAdd">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { createRentAPI, delExterpriseAPI, getEnterpriseListAPI, getRentBuildListAPI, getRentListAPI, uploadAPI, outRentAPI } from '@/api/enterprise'
export default {
  data() {
    return {
      rentDialogVisible: false,
      currentPage: 1,
      exterpriseList: [],
      params: {
        page: 1,
        pageSize: 2,
        name: ''
      },
      total: 0,
      // 合同
      rentForm: {
        buildingId: null, // 楼宇id
        contractId: null, // 合同id
        contractUrl: '', // 合同Url
        enterpriseId: null, // 企业名称
        type: 0, // 合同类型
        rentTime: [] // 合同时间
      },
      // 合同规则
      rentRules: {
        buildingId: [
          { required: true, message: '请选择楼宇', trigger: 'change' }
        ],
        rentTime: [
          { required: true, message: '请选择租赁日期', trigger: 'change' }
        ],
        contractId: [
          { required: true, message: '请上传合同文件' }
        ]
      },
      buildList: []
    }
  },
  mounted() {
    this.getExterpriseList()
  },
  methods: {
    async getExterpriseList() {
      const res = await getEnterpriseListAPI(this.params)
      this.exterpriseList = res.data.rows.map(item => {
        return {
          ...item,
          rentList: [] // 每一行补充存放合同的列表
        }
      })
      this.total = res.data.total
    },
    pageChange(page) {
      this.params.page = page
      this.getExterpriseList()
    },
    doSearch() {
      this.currentPage = 1
      this.params.page = 1
      this.getExterpriseList()
    },
    editRent(id) {
      this.$router.push({
        path: '/exterpriseAdd',
        query: {
          id
        }
      })
    },
    delExterprise(id) {
      this.$confirm('确认删除该企业吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await delExterpriseAPI(id)
        // 刷新列表
        this.getExterpriseList()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
    },
    async addRent(id) {
      this.rentForm.enterpriseId = id
      this.rentDialogVisible = true
      const res = await getRentBuildListAPI()
      this.buildList = res.data
    },
    closeDialog() {
      this.rentDialogVisible = false
    },
    async uploadHandle(fileData) {
      const { file } = fileData
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', 'contract')
      const res = await uploadAPI(formData)
      const { id, url } = res.data
      this.rentForm.contractId = id
      this.rentForm.contractUrl = url
      // 单独校验上传
      this.$refs.addForm.validate('contractId')
    },
    confirmAdd() {
      this.$refs.addForm.validate(async(valid) => {
        if (!valid) return
        const { buildingId, contractId, contractUrl, enterpriseId, type } = this.rentForm

        await createRentAPI({ buildingId, contractId, contractUrl, enterpriseId, type, startTime: this.rentForm.rentTime[0], endTime: this.rentForm.rentTime[1] })
        this.getExterpriseList()
        this.rentDialogVisible = false
      })
    },
    async expandHandle(row, rows) {
      console.log('展开或关闭', row, rows)
      // 判断是否展开当前的列
      const isExpend = rows.find(item => item.id === row.id)
      if (isExpend) {
        const res = await getRentListAPI(row.id)
        // 赋值，因为在渲染列表的时候已经给留了rentList这个坑位
        // eslint-disable-next-line require-atomic-updates
        row.rentList = res.data
      }
    },
    // tag类型
    formatInfoType(status) {
      const MAP = {
        0: 'waring',
        1: 'success',
        2: 'info',
        3: 'danger'
      }
      return MAP[status]
    },
    // stauts类型
    formartStatus(type) {
      const TYPEMAP = {
        0: '待生效',
        1: '生效中',
        2: '已到期',
        3: '已退租'
      }
      return TYPEMAP[type]
    },
    outRent(rentId) {
      this.$confirm('确认退租吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await outRentAPI(rentId)
        this.$message({
          type: 'success',
          message: '成功'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    check(id) {
      this.$router.push({
        path: '/exterpriseDetail',
        query: {
          id
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.department-container {
  padding: 10px;
}

.search-container {
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(237, 237, 237, .9);
  ;
  padding-bottom: 20px;

  .search-label {
    width: 100px;
  }

  .search-main {
    width: 220px;
    margin-right: 10px;
  }
}
.create-container{
  margin: 10px 0px;
}
.page-container{
  padding:4px 0px;
  text-align: right;
}
.form-container{
  padding:0px 80px;
}
</style>
