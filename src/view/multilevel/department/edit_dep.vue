<template>
  <div>
    <form id="add" class="form-horizontal" @submit.prevent="submit">
       <input type="hidden" v-model="id" name="id">
      <div class="form-group col-md-12" align="center">
        <label class="col-md-2 control-label">部门名称：</label>
        <div class="col-md-6">
          <input type="text" class="form-control"   placeholder="输入部门名称" v-model="depName" v-validate="'required|max:11'"
                 name="depName" id="depName"/>
        </div>
        <label class="col-md-4 label_error">{{ errors.first('depName') }}</label>
      </div>
      <div class="form-group col-md-12" align="center">
        <label class="col-md-2 control-label">部门联系方式：</label>
        <div class="col-md-6">
          <input type="text" class="form-control" placeholder="输入部门联系方式" v-model="depContact" v-validate="'required|max:18'"
                 name="depContact" id="depContact"/>
        </div>
        <label class="col-md-4 label_error">{{ errors.first('depContact') }}</label>
      </div>
      <div class="form-group col-md-12" align="center">
        <label class="col-md-2 control-label">部门备注：</label>
        <div class="col-md-6">
          <input type="text" class="form-control" placeholder="备注" v-model="depRemark"
                 name="depRemark" id="depRemark"/>
        </div>
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
  import { mapMutations } from 'vuex';
  import form_show from '@/libs/from_show';

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
  name: "edit_dep",
  mounted () {
    this.id = this.$route.params.id;
    axios.get(`department/findDetail/${this.id}`)
      .then(response => {
        const data  = response.data;
        if(data.code === 1){
          form_show.setData(data.data,this);
        }
      });

  },
    data () {
      return {
        id: null,
        depName: '',
        depContact: '',
        depRemark: ''
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
          axios.post('department/update',this.$data)
            .then(response => {
             const data = response.data;
              if(data.code === 1){
                console.log(this);
                alert('提交成功');
                this.closeTag({
                  name: 'edit_dep',
                  params: {
                    id: this.$route.params.id
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
