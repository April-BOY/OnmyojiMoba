// pages/search/search.js
import {unicodeToJson} from '../../utils/util.js';
Page({
  data: {
    searchInfo:[],
    rawData:[],
    // 获取式神录中图片的接口
    url:"https://ok.166.net/gameyw-gbox/moba/",
    inputValue:'',
    searchResult:[]
  },
  onLoad: function (options) {
    var that = this;
    wx.request({
      // 获取所有式神数据的接口
      url: 'https://comp-sync.webapp.163.com/g78_hero/free_convey?callback=jQuery111308366921136572285_1540169781437&_=1540169781439',
    	success: function(res) {
    		var shishenluJson = unicodeToJson(res.data);
        var arr = [];
        var searchInfo = [];
        var trueJson = shishenluJson.data;
        for(var i in trueJson){
          /**
           * 0 {cv名字:(4) ["绿川光", "谢添天", "Liam Obrien", "강호철"],式神ID:1020}
           * 1 {cv名字:(4) ["立花慎之介", "边江", "Crispin Freeman", "김명준"],式神ID:1020}
           */
          arr.push(trueJson[i]);
        }
        // 过滤获取到的数据
        arr.map(v=>{
          searchInfo.push({
            head_fang:v['式神方头像'],
            name:v['式神名称'],
          });
        });
        that.setData({
          rawData:searchInfo,
          searchInfo
        });
      }
    });
  },
  getInputValue:function(e){
    // 获取搜索框的输入内容
    this.setData({
      inputValue:e.detail.value,
      searchInfo:this.data.rawData
    });
    // console.log(this.data.inputValue);
  },
  search:function(){
    // 模糊搜索功能
    var keyword = new RegExp(this.data.inputValue);
    var arr = this.data.searchInfo;
    var searchInfo = [];
    for(var i =0;i < arr.length;i++){
      if(arr[i]['name'].match(keyword)!=null){
        searchInfo.push(arr[i]);
      }
    }
    console.log(searchInfo);
    this.setData({
      searchInfo
    });
  },
  navigateTodetail:function(){
    wx.navigateTo({
      url: '../detail/detail'
    })
  }
})