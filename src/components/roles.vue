<template>
  <div>
    <mybreadcrumb second="权限管理" third="权限列表"></mybreadcrumb>
    <el-button @click="dialogFormVisible = true">添加角色</el-button>
    <el-table :data="tableData5" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-row v-for="level1 in props.row.children" class="my-row">
            <el-col :span="6">
              <el-tag closable @close="delTag(level1,props.row)">{{level1.authName}}</el-tag>
              <span class="el-icon-arrow-right"></span>
            </el-col>
            <el-col :span="18">
              <el-col v-for="(level2, index) in level1.children" :key="index">
                <el-col :span="6">
                  <el-tag
                    closable
                    type="warning"
                    @close="delTag(level2,props.row)"
                  >{{level2.authName}}</el-tag>
                  <span class="el-icon-arrow-right"></span>
                </el-col>
                <el-col :span="18">
                  <el-tag
                    closable
                    type="success"
                    class="my-tag"
                    v-for="(level3, index) in level2.children"
                    :key="index"
                    @close="delTag(level3,props.row)"
                  >{{level3.authName}}</el-tag>
                </el-col>
              </el-col>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index"></el-table-column>
      <el-table-column label="角色名称" prop="roleName"></el-table-column>
      <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click="handleEdit(scope.row)"
            type="primary"
            icon="el-icon-edit"
            size="mini"
            plain
          ></el-button>
          <el-button
            type="danger"
            @click="delOne(scope.row)"
            icon="el-icon-delete"
            size="mini"
            plain
          ></el-button>
          <el-button
            type="success"
            icon="el-icon-check"
            size="mini"
            plain
            @click="giveRight(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加角色 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form
        :model="addForm"
        labelPosition="right"
        label-width="80px"
        :rules="rules"
        ref="addForm"
        status-icon
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model.trim="addForm.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input type="roleDesc" v-model.trim="addForm.password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('addForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 大树 -->
    <el-dialog title="权限分配" :visible.sync="treeVisible">
      <el-tree :props="props"  show-checkbox ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="treeVisible = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      props:{
        label:"authName",
        children:"children"
      },
      tableData5: [],
      addForm: [],
      dialogFormVisible: false,
      treeVisible:false,
      rules: {
        addForm: "",
        roleDesc: ""
      }
    };
  },
  methods: {
    async getRoles() {
      let res = await this.$http.get("roles");
      // console.log(res);
      this.tableData5 = res.data.data;
    },
    async delTag(tag, item) {
      let res = await this.$http.delete(`roles/${item.id}/rights/${tag.id}`);
      // console.log(res);
      item.children = res.data.data;
    },

    // async submitForm(item) {
    //   let res = await this.$http.post("roles");
    //   console.log(res);
    // },
    delOne(item) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let res = await this.$http.delete(`roles/${item.id}`);
          // console.log(res)
          if (res.data.data.meta.status == "200") {
            this.$message.success("删除成功");
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
      this.getRoles();
    },
    treeVisible(item){
      this.treeVisible = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let res;
          if (formName === "addForm") {
            res = await this.$http.post(`roles`, {
              roleName: this.addForm.roleName,
              roleDesc: this.addForm.roleDesc
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  created() {
    this.getRoles();
  }
};
</script>

<style scoped>
.my-alert {
  margin-top: 20px;
}
.my-row {
  margin-bottom: 10px;
  /* height: 80px;
  line-height: 80; */
}
</style>
