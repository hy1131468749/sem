import global_config from '@/libs/global_config'
const bootstrapUtils = {};
bootstrapUtils.initBaseTableConfig = function (url, columns, getQueryParams) {
  return {
    url: global_config.httpUrl + url,
    dataType: 'json',//返回数据格式
    sidePagination: 'server',//分页 server为后端分页 client为前端分页
    contentType: "application/x-www-form-urlencoded",
    pageNumber:1,                       //初始化加载第一页，默认第一页
    pageSize: 10,                       //每页的记录行数（*）
    pageList: [1,10, 25, 50, 100],        //可供选择的每页的行数（*）
    queryParams: function (page) {
      const params = getQueryParams();
      console.log(params);
      return Object.assign(params, {
        pageSize: page.limit,
        pageNumber: page.offset / page.limit + 1
      });
    },
    toolbarAlign: 'left',//工具条位置
    //showJumpTo:true,//跳转页 此为拓展功能
    columns: columns,//列
    queryParamsType: 'limit',
    method: 'get',//请求方式
    showColumns: true,//列显示隐藏操作按钮
    clickToSelect: true,//点击行选中
    cache: false,//缓存
    onlyInfoPagination: false,//
    showRefresh: true,//显示刷新按钮
    showToggle: true,
    pagination: true,//分页
    smartDisplay: false,
    striped: true,//斑马纹
    paginationLoop: false,//循环分页,
    responseHandler: function (res) {
      return {'rows':res.data.data, 'total': res.data.total};
    },
    onLoadSuccess: function (res) {
      console.log('加载成功');
    }
  }
};

bootstrapUtils.initTable=function (id,tableConfig) {
  return $('#'+id).bootstrapTable(tableConfig);
}

export default bootstrapUtils;
