<template>
  <el-container class="index-container">
    <el-header class="index-header">
      <el-row>
        <el-col :span="4">
          <img src="../assets/logo.png" alt>
        </el-col>
        <el-col class="header-center" :span="16">
          <div class="grid-content bg-purple-light">电商后台管理系统</div>
        </el-col>
        <el-col :span="4" class="header-right">
          <div class="grid-content bg-purple">
            <el-button type="primary" round @click="exit">退出</el-button>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="index-aside" width="200px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"      
          router
        >
          <el-submenu :index="index" v-for="(item,index) in menuList" >
            <template slot="title" >
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>             
              <el-menu-item v-for="it in item.children" :index="it.path"><span class="el-icon-menu"></span>{{it.authName}}</el-menu-item>                  
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="index-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  // beforeCreate() {
  //     if(window.sessionStorage.getItem('token')){

  //     }else{
  //         this.$message.warning(请重新登录);
  //         this.$router.push('/login')
  //     }
  // },
  data() {
    return {
      menuList:[]
    };
  },
  methods: {
    exit() {
      this.$confirm("是否退出, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          window.sessionStorage.removeItem("token");
          this.$router.push("/login");
        })
        .catch(() => {});
    }
  },
  async created() {
    let res = await this.$http.get("menus");
    console.log(res);
    this.menuList = res.data.data;
  },
};
</script>

<style>
body {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.index-container {
  height: 100vh;
}
.index-header {
  height: 60px;
  background-color: #b3c0d1;
  line-height: 60px;
}
.header-center {
  text-align: center;
  font-size: 30px;
  color: #fff;
  font-weight: 700;
}
.header-right {
  text-align: right;
}
.el-main.index-main {
  background-color: #e9eef3;
  padding-top: 0px;
}
</style>
