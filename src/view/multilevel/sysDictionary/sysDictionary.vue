<template>
  <div class="container">
    <div style="float: left;width: 20%">  <ul id="treeDemo" class="ztree"></ul> </div>
    <div style="float: left;width: 80%;">
      <div class="form-group">
        <label class="control-label col-md-2">参数名称</label>
        <div class="col-md-4" >
          <input type="text" v-model="name" class="form-control col-md-4">
        </div>
        <div class="col-md-5" align="right">
          <button type="button" class="btn btn-success" @click="queryData">查询</button>
        </div>
      </div>
      <div id="toolbar" class="col-md-12" style="margin-top: 20px;">
      <button type="button" class="btn btn-success" @click="add">新增</button>
      <button type="button" class="btn btn-success" @click="edit">修改</button>
      <button type="button" class="btn btn-success" @click="deleteById">删除</button>
    </div>
    <table id="a1" class="col-md-12">
    </table>
    </div>
  </div>

</template>
<script>
  import 'bootstrap/dist/css/bootstrap.min.css';
  import 'bootstrap-table/dist/bootstrap-table.css';
  import 'bootstrap/dist/js/bootstrap';
  import 'bootstrap-table/dist/bootstrap-table';
  import 'bootstrap-table/dist/locale/bootstrap-table-zh-CN';
  import bootstrapUtils from '@/libs/bootstrapUtils';
  import 'ztree/css/zTreeStyle/zTreeStyle.css'
  import 'ztree/js/jquery.ztree.core';
  import axios from '@/libs/axios_sys';
  import global_config from "@/libs/global_config";
  import Cookies from 'js-cookie'


export default {
    name: 'level_2_1',
    data () {
      return {
          parentId: 1,
          parentName: '',
          name: '',
          searchName: '',
          searchParentId: 1
        };
      },
      methods: {
        add() {
          // $("#a1").bootstrapTable('getSelections') 获取选择行
          // $("#a1").bootstrapTable('getSelections') 获取选择行
          //this.$router.push({ path: '/multilevel/level_2_1/sys_add'});
          this.$router.push( { name: 'add_sysDictionary',
          /*  params: {
              parentName: this.parentName,
              parentId: this.parentId+""
            }*/
          });
        },
        edit () {
          const check = $("#a1").bootstrapTable('getSelections');
          if(check.length == 0){
            alert('请先选中一个');
          }
          this.$router.push( { name: 'edit_sysDictionary',
            params: {
              id: check[0].id
            }
          });

        },
        deleteById (){
          const check = $("#a1").bootstrapTable('getSelections');
          if(check.length == 0){
            alert('请先选中一个');
          }
          let ids = [];
          check.forEach((value,index) => {
            ids.push(value.id);
          });
          axios.get('sysDictionary/delete',{params: {ids: ids}})
        .then(respon => {
              const data = respon.data;
              if(data.code === 1){
                alert('删除成功');
              }
            });
        },
        zTreeOnClick(event, treeId, treeNode){
          this.parentId = treeNode.id;
          this.parentName = treeNode.name;
        },
        getQueryParams (){
          return {
            searchName: this.searchName,
            searchParentId: this.searchParentId
          }
        },
        queryData(){
          this.searchName = this.name;
          this.searchParentId = this.parentId;
          const params = {
            searchParentId: this.searchParentId,
            searchName: this.searchName,
          pageNumber: 0,
          pageSize: 10
        };

        axios.get('sysDictionary/findList',{params:params})
          .then(response =>{
          $("#a1").bootstrapTable('load',{rows:response.data.data.data, total: response.data.data.total});
        }).catch(error => {
          console.log('sysDictionary出错');
        });

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
      const url = 'sysDictionary/findList';
      const tableConfig = bootstrapUtils.initBaseTableConfig(url, columns,this.getQueryParams);
      const setting = {
        callback: {
          onClick: this.zTreeOnClick
        },
        async: {
          enable: true,
          type: 'get',
          url: `${global_config.httpUrl}/sysDictionary/findZtree`,
          autoParam: ['id']
        }

      };
      bootstrapUtils.initTable('a1', tableConfig);
      axios.get(`sysDictionary/findZtree?id=${this.parentId}`).
      then(reponse => {
        let zTreeObj = $.fn.zTree.init($("#treeDemo"), setting, reponse.data);
      }).catch(error =>{
      });
    }
  }
</script>
