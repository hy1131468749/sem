<template>
  <div   style="margin-top: 50px;">
  <form id="add" class="form-horizontal" @submit.prevent="submit" >

    <div class="form-group col-md-12" align="center">
      <label class="col-md-2 control-label">用户：</label>
      <div class="col-md-6">
        <input type="text" class="form-control"   placeholder="输入用户" v-model="userName" v-validate="'required|max:11'"
               name="userName"/>
      </div>
      <label class="col-md-4 label_error">{{ errors.first('userName') }}</label>
    </div>

    <div class="form-group col-md-12" align="center">
      <label class="col-md-2 control-label">密码：</label>
      <div class="col-md-6">
        <input type="text" class="form-control"   placeholder="密码" v-model="password" v-validate="'required|max:11'"
               name="password"/>
      </div>
      <label class="col-md-4 label_error">{{ errors.first('password') }}</label>
    </div>

    <div class="form-group col-md-12" align="center">
      <button type="submit" class="btn btn-primary" >登录</button>
    </div>
  </form>
  </div>

</template>

<script>
  import Vue from 'vue';
  import VeeValidate from 'vee-validate';
  import zh_CN from 'vee-validate/dist/locale/zh_CN';
  import VueI18n from 'vue-i18n';
  import axios from '@libs/axios_sys'
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
        name: 'login',
        data () {
          return {
            userName: '',
            password: ''
          }
        },
        methods: {
          submit() {
              this.$validator.validateAll().then((result) => {
                if (!result) {
                  const name = this.errors.items[0].field;
                  // 如果失败 获取焦点
                  $('input[name=' + name + ']')[0].focus();
                  return;
                }
              });
              axios.post('/login')
          }
        }

    }
</script>

<style scoped>

</style>
