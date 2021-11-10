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
        <el-input v-model="form.projec" @focus="toggleDialog" readonly></el-input>
      </el-form-item>
      <el-form-item label="地址:">
        <el-input v-model="form.address">
          <template slot="prepend">http://</template>
        </el-input>
      </el-form-item>
      <el-form-item label="路径:">
        <div>
          <el-tag
            v-for="(tag, index) in pathTags"
            :key="index"
            :disable-transitions="false"
            closable
            @close="handleClose(tag)">
            {{tag}}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm">
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
        </div>
      </el-form-item>
    </el-form>
    <div>
      <el-button type="primary" size="mini">{{form.environment === 'dev' ? '生成骨架屏' : '打包'}}</el-button>
    </div>

    <!-- 新增项目弹框 -->
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
      pathTags: [],
      inputVisible: false,
      inputValue: '',
      form: {
        environment: 'dev',
        projec: '',
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
      this.form.projec = path
    },
    handleClose(tag) {
      this.pathTags.splice(this.pathTags.indexOf(tag), 1)
    },
    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.pathTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    }
  }
}
</script>
<style scoped>
/* 路由选项 --- start */
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
/* 路由选项 --- end */
</style>
