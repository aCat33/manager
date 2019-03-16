<template>
  <div>
    <mybreadcrumb second="订单管理" third="订单列表"></mybreadcrumb>
    <!-- 栅格布局-->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="date" label="订单编号" width="180"></el-table-column>
      <el-table-column prop="name" label="订单价格" width="180"></el-table-column>
      <el-table-column prop="address" label="是否付款"><el-button type="danger" plain>未付款</el-button></el-table-column>
      <el-table-column prop="address" label="是否发货"></el-table-column>
      <el-table-column prop="address" label="下单时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            @click="handleEdit(scope.row)"
            type="primary"
            icon="el-icon-edit"
            size="mini"
            plain
          ></el-button>       
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          tag: '家'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1517 弄',
          zip: 200333,
          tag: '公司'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1519 弄',
          zip: 200333,
          tag: '家'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1516 弄',
          zip: 200333,
          tag: '公司'
        }],
      }
  }
};
</script>

<style>
</style>
