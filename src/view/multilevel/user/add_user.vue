<template>
  <div>
    <form id="add" class="form-horizontal" @submit.prevent="submit">
      <input type="hidden" v-model="depId" name="depId">
      <div class="form-group col-md-12" align="center">
        <label class="col-md-2 control-label">部门名称：</label>
        <div class="col-md-6">
          <input type="text" class="form-control"   placeholder="输入部门名称" v-model="depName" v-validate="'required|max:11'"
                 name="depName"/>
        </div>
        <label class="col-md-4 label_error">{{ errors.first('depName') }}</label>
      </div>

      <div class="form-group col-md-12" align="center">
        <label class="col-md-2 control-label">用户姓名：</label>
        <div class="col-md-6">
          <input type="text" class="form-control" placeholder="输入姓名联系方式" v-model="userName" v-validate="'required|max:18'"
                 name="userName"/>
        </div>
        <label class="col-md-4 label_error">{{ errors.first('userName') }}</label>
      </div>

      <div class="form-group col-md-12" align="center">
        <label class="col-md-2 control-label">用户账号：</label>
        <div class="col-md-6">
          <input type="text" class="form-control" placeholder="输入用户账号" v-model="account" v-validate="'required|max:18'"
                 name="account"/>
        </div>
        <label class="col-md-4 label_error">{{ errors.first('account') }}</label>
      </div>

      <div class="form-group col-md-12" align="center">
        <label class="col-md-2 control-label">密码：</label>
        <div class="col-md-6">
          <input type="text" class="form-control" placeholder="密码" v-model="password" v-validate="'required|max:18'"
                 name="password"/>
        </div>
        <label class="col-md-4 label_error">{{ errors.first('password') }}</label>
      </div>

      <div class="form-group col-md-12" align="center">
        <label class="col-md-2 control-label">手机号：</label>
        <div class="col-md-6">
          <input type="text" class="form-control" placeholder="手机号" v-model="mobile" v-validate="'required|max:18'"
                 name="mobile"/>
        </div>
        <label class="col-md-4 label_error">{{ errors.first('mobile') }}</label>
      </div>

      <div class="col-md-12 form-group" align="center">
        <button type="submit" class="btn btn-primary" >提交</button>
      </div>
    </form>
  </div>
</template>

<script>
  import Vue from 'vue';
  import axios from '@/libs/axios_sys'
  import VeeValidate from 'vee-validate';
  import zh_CN from 'vee-validate/dist/locale/zh_CN'
  import VueI18n from 'vue-i18n';
  import qs from 'qs';
  import { mapMutations } from 'vuex'

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
    name: 'add_user',
    mounted () {
      this.depId = this.$route.params.depId;
      this.depName = this.$route.params.depName;
    },
    data () {
      return {
        userName: '',
        depName: '',
        depId: null,
        account: '',
        password: '',
        mobile: ''
      }
    },
    methods: {
      ...mapMutations([
        'closeTag'
      ]),
      submit () {
        this.$validator.validateAll().then((result) => {
          if(!result){
            const name = this.errors.items[0].field;
            // 如果失败 获取焦点
            $('input[name='+name+']')[0].focus();
            return;
          }

          axios.post('user/add',this.$data)
            .then(response => {
              const data = response.data;
              if(data.code === 1){
                console.log(this);
                alert('提交成功');
                this.closeTag({
                  name: 'add_user',
                  params: {
                    depId: this.$route.params.depId,
                    depName: this.$route.params.depName
                  }
                });
              }else{
                alert('提交失败');
              }
            })
            .catch(function (error) {
              alert('系统出错，请稍后重试');
            });
        });
      }
    }

  }
</script>

<style scoped>
</style>
