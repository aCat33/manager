<template>
  <div>
    <mybreadcrumb second="商品管理" third="分类参数"></mybreadcrumb>
    <el-alert title="警告提示的文案" type="warning" show-icon></el-alert>
    <div>请选择商品分类 :
      <el-select v-model="select" slot="prepend" placeholder="请选择">
        <el-option label="餐厅名" value="1"></el-option>
        <el-option label="订单号" value="2"></el-option>
        <el-option label="用户电话" value="3"></el-option>
      </el-select>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="first">
          <el-button type="primary" disabled>获取动态参数</el-button>
        </el-tab-pane>
        <el-tab-pane label="配置管理" name="second">
          <el-button type="primary" disabled>获取静态参数</el-button>
        </el-tab-pane>
      </el-tabs>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" :index="indexMethod"></el-table-column>
        <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
