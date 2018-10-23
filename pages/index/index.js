Page({
  data:{
    
  },
  onLoad:function(){
    wx.request({
      url: 'https://comp-sync.webapp.163.com/g78_hero/free_convey?callback=jQuery111308366921136572285_1540169781437&_=1540169781439',
      header:{
        'content-type': 'application/json',
        'content-type': 'application/x-www-form-urlencoded'
      },
      responseType:"text",
      success:function(res){
        // console.log(res.data);
        var start = res.data.indexOf("{");
        var end = res.data.lastIndexOf("}")+1;
        var string = res.data.slice(start,end)
        var json = JSON.parse(string)
        console.log(json.data);
      }
    })
  },
  switchContent:function(e){
    console.log(e.target)
  }
})
