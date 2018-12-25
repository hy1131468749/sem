<template>
  <div>
    <form id="add" class="form-inline">
      <div class="form-group col-md-12" align="center">
        <label class="col-md-3 label_desc" >姓名：</label>
        <input type="text" class="form-control col-md-3" placeholder="输入名称" v-bind="name" v-validate="'required|email'"
               name="name"/>
        <label class="col-md-4 label_error">{{ errors.first('name') }}</label>
      </div>
    </form>
  </div>
</template>

<script>
  import Vue from 'vue';
  import VeeValidate from 'vee-validate';

  Vue.use(VeeValidate);
  export default {
    name: "add",
    data() {
      return {
        name: '',
      }
    }
  }
</script>

<style scoped>
.label_desc{
  height: 34px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  text-align: right;
}
.label_error{
  height: 34px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  text-align: left;
}
</style>
