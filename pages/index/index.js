Page({
  data:{
    piFuInfo:[],
    currentId:"ea103f45-3382-4823-8a92-7e385db8af75"
  },
  onLoad:function(getPifuData){
    var that = this;
    wx.request({
      // url: 'https://comp-sync.webapp.163.com/g78_hero/free_convey?callback=jQuery111308366921136572285_1540169781437&_=1540169781439',
      url:'https://sixhorse.game.163.com/news/outer/newslist.do?callback=jQuery111305420124445720846_1540285706302&contentkind=29513&_=1540285706303',
      header:{
        'content-type': 'application/json',
        'content-type': 'application/x-www-form-urlencoded'
      },
      responseType:"text",
      success:function(res){
        /**
         * 解决返回的数据是 Unicode 编码的问题
         */
        /* var start = res.data.indexOf("{");
        var end = res.data.lastIndexOf("}")+1;
        var string = res.data.slice(start,end);
        var json = JSON.parse(string)
        console.log(json.data);
        var url = "https://ok.166.net/gameyw-gbox/moba/"; */
        var pifuJson = that.unicodeToJson(res.data);
        console.log(pifuJson.result);
        that.setData({
          piFuInfo:pifuJson.result
        });
        console.log(that.data.piFuInfo[0].comment);
      },
    });
  },
//   getPifuData:function(){
//     wx:request({
//     	url:'https://sixhorse.game.163.com/news/outer/newslist.do?callback=jQuery111305420124445720846_1540285706302&contentkind=29513&_=1540285706303',
//     	success:function(){
//     		
//     	}
//     });
//   },
  switchContent:function(e){
    this.setData({
      currentId:e.currentTarget.dataset.id
    });
  },
  unicodeToJson:function(obj){
    var start = obj.indexOf("{");
    var end = obj.lastIndexOf("}")+1;
    var string = obj.slice(start,end);
    var json = JSON.parse(string);
    return json;
  }
})
