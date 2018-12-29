const form_show = {};
form_show.setData = function (datas,vue) {
  for (let data in datas) {

    const element = document.getElementById(data);
    if(element == null){
      continue;
    }
    vue[data] = datas[data];
  }

}


export default form_show
