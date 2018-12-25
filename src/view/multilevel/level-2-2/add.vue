<template>
  <div>
    <form id="add" class="form-horizontal" @submit.prevent="submit">
      <div class="form-group col-md-12" align="center">
        <label class="col-md-2 control-label">姓名：</label>
        <div class="col-md-6">
          <input type="text" class="form-control"   placeholder="输入名称" v-bind="name" v-validate="'required|email'"
                 name="name"/>
        </div>
        <label class="col-md-4 label_error">{{ errors.first('name') }}</label>
      </div>
      <div class="form-group col-md-12" align="center">
        <label class="col-md-2 control-label">参数值：</label>
        <div class="col-md-6">
          <input type="text" class="form-control" placeholder="输入参数值" v-bind="value" v-validate="'required'"
                 name="value"/>
        </div>
        <label class="col-md-4 label_error">{{ errors.first('value') }}</label>
      </div>
      <button type="submit" class="btn btn-primary" >（首选项）Primary</button>
    </form>
  </div>
</template>

<script>
  import Vue from 'vue';

  import VeeValidate from 'vee-validate';
  import zh_CN from 'vee-validate/dist/locale/zh_CN'
  import VueI18n from 'vue-i18n';

  Vue.use(VueI18n);
  const i18n = new VueI18n({
    locale: 'zh_CN',
  });
  Vue.use(VeeValidate, {
    i18n,
    i18nRootKey: 'validation',
    dictionary: {
      zh_CN
    }
  });
export default {
    name: "add",
    data () {
      return {
        name: '',
        value: '',
        email: ''
      }
    },
    methods: {
      submit () {
        this.$validator.validateAll().then((result) => {
           if(!result){
             console.log(this.errors.items[0]);
             const name = this.errors.items[0].field;
              // 如果失败 获取焦点
             $('input[name='+name+']')[0].focus();

             return;
           }
        });
      }
    }

  }
</script>

<style scoped>
  .label_desc {
    height: 34px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    text-align: right;
  }

  .label_error {
    height: 34px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    text-align: left;
  }
</style>
