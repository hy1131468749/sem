<template>
  <div class="container">
    <div id="toolbar">
      <button type="button" class="btn btn-success" @click="add">新增</button>
      <button type="button" class="btn btn-success">修改</button>
      <button type="button" class="btn btn-success">删除</button>
    </div>
    <table id="a1">
    </table>
  </div>

</template>
<script>
  import 'bootstrap/dist/css/bootstrap.min.css';
  import 'bootstrap-table/dist/bootstrap-table.css';
  import 'bootstrap/dist/js/bootstrap';
  import 'bootstrap-table/dist/bootstrap-table';
  import 'bootstrap-table/dist/locale/bootstrap-table-zh-CN';
  import bootstrapUtils from '@/libs/bootstrapUtils';

  export default {
    name: 'level_2_1',
    methods: {
      add() {
        // $("#a1").bootstrapTable('getSelections') 获取选择行
        // $("#a1").bootstrapTable('getSelections') 获取选择行
        //this.$router.push({ path: '/multilevel/level_2_1/sys_add'});
        this.$router.push({name: 'sys_add'});
      }
    },
    mounted() {
      const columns = [
        {checkbox: true}
        , {
          field: 'id',
          title: 'Item ID'
        }, {
          field: 'name',
          title: 'Item Name'
        }
      ];
      const url = 'http://localhost:8080/findList';
      const tableConfig = bootstrapUtils.initBaseTableConfig(url, columns);
      console.log(tableConfig);
      bootstrapUtils.initTable('a1', tableConfig);
    }
  }
</script>
