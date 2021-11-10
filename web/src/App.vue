<template>
  <div id="app">
    <el-form :model="form" label-width="90px">
      <el-form-item label="环境:">
        <el-radio-group v-model="form.environment">
          <el-radio label="dev">开发环境</el-radio>
          <el-radio label="pro">生成环境</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="项目:">
        <el-input v-model="form.address" @focus="toggleDialog" readonly></el-input>
      </el-form-item>
    </el-form>
    <div>
      <el-button type="primary" size="mini">{{form.environment === 'dev' ? '生成骨架屏' : '打包'}}</el-button>
    </div>

    <!-- 新增项目弹框 2222-->
    <el-dialog title="导入项目"
      :visible.sync="addProjectDialog"
      :append-to-body="true"
      width="550px">
      <add-project
        :visible.sync="addProjectDialog"
        @select="addProject"></add-project>
    </el-dialog>
  </div>
</template>

<script>
import SelectOsPath from './components/select-os-path.vue'

export default {
  name: 'App',
  components: {
    addProject: SelectOsPath
  },
  data () {
    return {
      addProjectDialog: false,
      form: {
        environment: 'dev',
        address: ''
      }
    }
  },
  methods: {
    // 选择项目
    toggleDialog () {
      this.addProjectDialog = true
    },
    // 添加项目
    addProject (path) {
      this.form.address = path
    }
  }
}
</script>
<style>
</style>
