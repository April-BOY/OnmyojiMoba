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
  onLoad: function () {
    var arr = wx.getStorageSync('shishen')
    var searchInfo = [];
    // 过滤获取到的数据
    arr.map(v=>{
      searchInfo.push({
        head_fang:v['式神方头像'],
        name:v['式神名称'],
        id:v['式神ID']
      });
    });
    this.setData({
      rawData:searchInfo,
      searchInfo
    });
  },
  getInputValue:function(e){
    // 获取搜索框的输入内容
    this.setData({
      inputValue:e.detail.value,
      searchInfo:this.data.rawData
    });
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
    this.setData({
      searchInfo
    });
  },
  navigateTodetail:function(e){
    console.log();
    wx.navigateTo({
      url: '../detail/detail?id='+e.currentTarget.dataset.id
    })
  }
})