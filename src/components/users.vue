<template>
  <div>
    <!-- 面包屑 -->
    <mybreadcrumb second="用户管理" third="用户列表"></mybreadcrumb>
    <!-- 栅格布局-->
    <el-row>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-input
            placeholder="请输入内容"
            @keyup.native.enter="search"
            v-model="sendData.query"
            class="input-with-select"
          >
            <el-button slot="append" @click="search" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">
          <el-button type="primary" @click="dialogFormVisible = true" plain>添加用户</el-button>
        </div>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="password" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch
            @change="changestatus(scope.row)"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
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
            @click="chooseRole(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :page-sizes="[2, 4, 6, 8]"
      :page-size="sendData.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="sizeChange"
      @current-change="currentChange"
    ></el-pagination>
    <!-- 添加用户 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form
        :model="addForm"
        labelPosition="right"
        label-width="80px"
        :rules="rules"
        ref="addForm"
        status-icon
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model.trim="addForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model.trim="addForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model.trim="addForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model.trim="addForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('addForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑用户 -->
    <el-dialog title="编辑用户" :visible.sync="editFormVisible">
      <el-form
        :model="editForm"
        labelPosition="right"
        label-width="120px"
        :rules="rules"
        ref="editForm"
        status-icon
      >
        <el-form-item label="用户名" prop="username">
          <el-input disabled v-model.trim="editForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model.trim="editForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model.trim="editForm.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('editForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 用户角色 -->
    <el-dialog title="角色分配" :visible.sync="roleFormVisible">
      <el-form
        :model="roleForm"
        labelPosition="right"
        label-width="80px"
        :rules="rules"
        ref="roleForm"
        status-icon
      >
        <el-form-item label="当前用户" prop="username">{{roleForm.username}}</el-form-item>
        <el-form-item label="请选择角色" prop>
          <el-select v-model="roleForm.role_name" placeholder="请选择">
            <el-option
              v-for="item in roleList"
              :key="item.value"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('roleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    //判断手机号是否输入正确
    var Mobile = (rule, value, callback) => {
      setTimeout(() => {
        let res = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        if (res.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确手机号"));
        }
      }, 1000);
    };
    //验证邮箱是否输入正确
    var Email = (rule, value, callback) => {
      setTimeout(() => {
        let res = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (res.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确邮箱号"));
        }
      }, 1000);
    };
    return {
      //返回的数据组  页数
      sendData: {
        query: "",
        pagenum: "1",
        pagesize: 8
      },
      total: 0,
      //表格数据
      tableData: [],
      //设置添加用户表格不显示
      dialogFormVisible: false,
      editFormVisible: false,
      roleFormVisible: false,
      //添加用户的信息表格
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      //rules设置添加的要求限制
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 12, message: "长度在 3 到 12 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        email: [{ validator: Email, trigger: "blur" }],
        mobile: [{ validator: Mobile, trigger: "blur" }]
      },
      // 编辑用户
      editForm: {
        username: "",
        email: "",
        mobile: ""
      },
      //角色用户
      roleForm: {
        username: "",
        email: "",
        mobile: ""
      },
      //角色列表
      roleList: []
    };
  },
  methods: {
    async handleEdit(item) {
      this.editFormVisible = true;
      let res = await this.$http.get(`users/${item.id}`);
      this.editForm = res.data.data;
    },
    async search() {
      let res = await this.$http.get("users", {
        // headers: {
        //   Authorization: window.sessionStorage.getItem("token")
        // },
        params: this.sendData
      });
      // console.log(res);
      this.tableData = res.data.data.users;
      this.total = res.data.data.total;
    },
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let res;
          if (formName == "editForm") {
            res = await this.$http.put(
              `users/${this.editForm.id}`,
              this.editForm
            );
          } else if (formName == "addForm") {
            res = await this.$http.post("users", this.addForm, {
              // headers: {
              //   Authorization: window.sessionStorage.getItem("token")
              // },
              // params: this.sendData
            });
            // console.log(res);
          } else if (formName == "roleForm") {
            res = await this.$http.put(`users/${this.roleForm.id}/role`, {             
              rid: this.roleForm.role_name
            });
            // console.log(res);
          }

          if (res.data.meta.status == "201" || res.data.meta.status == "200") {
            this.search();
            this.dialogFormVisible = false;
            this.editFormVisible = false;
            this.roleFormVisible = false;
          }
        } else {
          this.$message.warning("请输入正确信息");
          return false;
        }
      });
    },
    //删除信息
    delOne(item) {
      this.$confirm("确定要删除么, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let res = await this.$http.delete(`users/${item.id}`);
          if (res.data.meta.status == 200) {
            this.search();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //修改状态
    async changestatus(item) {
      let res = await this.$http.put(`users/${item.id}/state/${item.mg_state}`);
      // console.log(res);
      if (res.data.meta.status == 200) {
        this.search();
      }
    },
    //页容量改变
    sizeChange(size) {
      this.sendData.pagesize = size;
      this.search();
    },
    currentChange(current) {
      this.sendData.pagenum = current;
      this.search();
    },
    async chooseRole(item) {
      this.roleFormVisible = true;
      this.roleForm = item;
      let res = await this.$http.get("roles");
      this.rolelist = res.data.data;
    }
  },
  created() {
    this.search();
  }
};
</script>

<style>
.el-breadcrumb.my-breadcrumb {
  height: 45px;
  line-height: 45px;
  background-color: #d3dce6;
  padding-left: 10px;
}

.el-form {
  padding: 0;
  height: auto;
}


</style>
