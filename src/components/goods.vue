<template>
  <div>
    <mybreadcrumb second="商品管理" third="商品列表"></mybreadcrumb>
    <!-- 栅格布局-->
    <el-row>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <el-input placeholder="请输入内容" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">
          <el-button type="primary" plain>添加商品</el-button>
        </div>
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
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
