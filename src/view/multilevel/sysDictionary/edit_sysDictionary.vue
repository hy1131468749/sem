<template>
  <div>
    <form id="add" class="form-horizontal" @submit.prevent="submit">
       <input type="hidden" v-model="id" name="id">
      <div class="form-group col-md-12" align="center">
        <label class="col-md-2 control-label">参数姓名：</label>
        <div class="col-md-6">
          <input type="text" class="form-control"  id="name"  placeholder="输入参数名称" v-model="name" v-validate="'required|max:11'"
                 name="name"/>
        </div>
        <label class="col-md-4 label_error">{{ errors.first('name') }}</label>
      </div>
      <div class="form-group col-md-12" align="center">
        <label class="col-md-2 control-label">参数值：</label>
        <div class="col-md-6">
          <input type="text" class="form-control" id="value" placeholder="输入参数值" v-model="value" v-validate="'required|max:11'"
                 name="value"/>
        </div>
        <label class="col-md-4 label_error">{{ errors.first('value') }}</label>
      </div>
      <div class="form-group col-md-12" align="center">
        <label class="col-md-2 control-label">唯一标识：</label>
        <div class="col-md-6">
          <input type="text" class="form-control" placeholder="唯一标识" id="uniqueSign" v-model="uniqueSign" v-validate="'required|max:11'"
                 name="uniqueSign"/>
        </div>
        <label class="col-md-4 label_error">{{ errors.first('uniqueSign') }}</label>
      </div>
      <div class="form-group col-md-12" align="center">
        <label class="col-md-2 control-label">排序：</label>
        <div class="col-md-6">
          <input type="text" class="form-control" id="sort" placeholder="输入参数值" v-model="sort" v-validate="'numeric'"
                 name="sort"/>
        </div>
        <label class="col-md-4 label_error">{{ errors.first('sort') }}</label>
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
  name: "edit_sysDictionary",
  mounted () {
    this.id = this.$route.params.id;
    axios.get(`sysDictionary/findDetail/${this.id}`)
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
        parentName: '',
        name: '',
        value: '',
        uniqueSign: '',
        sort: '',
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
          axios.post('sysDictionary/update',this.$data)
            .then(response => {
             const data = response.data;
              if(data.code === 1){
                console.log(this);
                alert('提交成功');
                this.closeTag({
                  name: 'edit_sysDictionary',
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
