<template>
  <el-container class="index-container" >
    <el-header class="index-header">
      <el-row>
        <el-col :span="4">
          <img src="../assets/logo.png" alt="">
        </el-col>
        <el-col class="header-center" :span="16">
          <div class="grid-content bg-purple-light">电商后台管理系统</div>
        </el-col>
        <el-col :span="4" class="header-right">
          <div class="grid-content bg-purple">
              <el-button type="primary" round>退出</el-button>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="index-aside" width="200px">Aside</el-aside>
      <el-main class="index-main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {};
</script>

<style>
body{
    width: 100%;
    height: 100%;
    background-color: #fff;
}
.index-container{
    height: 100vh;
}
.index-header{
    height: 60px;
    background-color: #b3c0d1;
    line-height: 60px;
}
.header-center{
    text-align: center;
    font-size: 30px;
    color:#fff;
    font-weight: 700;
}
.header-right{
    text-align: right;
}
.index-main{
    background-color: #e9eef3;
}
</style>
