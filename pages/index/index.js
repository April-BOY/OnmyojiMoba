import {unicodeToJson,formatTime} from '../../utils/util.js';
import {icon} from '../../images/icon.js';
Page({
	data: {
    tab:[
      {
        name:"全新皮肤"
      },
      {
        name:"全新式神"
      },
      {
        name:"周免式神"
      },
      {
        name:"全部式神"
      }
    ],
    flag:false,
		piFuInfo: [],
    currentPifuUrl:"",
    currentTit:"",
    currentDesc:"",
		currentId: "",
    currentIndex:0,
    shiShenLuInfo:[],
    // 获取式神录中图片的接口
    url:"https://ok.166.net/gameyw-gbox/moba/",
    freeTime:'',
    weekFreeTime:'',
    indicators:[],
    icon
  },
	onLoad: function() {
    var that = this;
		wx.request({
      // 获取式神皮肤数据的接口
			url: 'https://sixhorse.game.163.com/news/outer/newslist.do?callback=jQuery111305420124445720846_1540285706302&contentkind=29513&_=1540285706303',
			header: {
				'content-type': 'application/json',
				'content-type': 'application/x-www-form-urlencoded'
			},
			responseType: "text",
			success: function(res) {
        var pifuJson = unicodeToJson(res.data);
        if(!pifuJson){
          wx.showToast({title:'数据请求失败'});
        }
				that.setData({
          piFuInfo: pifuJson.result
        });
      },
      complete:function(){
        that.requestShiShenData();
      }
  });
  },
  requestShiShenData:function(){
    var that = this;
    wx.request({
      // 获取所有式神数据的接口
      url: 'https://comp-sync.webapp.163.com/g78_hero/free_convey?callback=jQuery111308366921136572285_1540169781437&_=1540169781439',
    	success: function(res) {
    		var shishenluJson = unicodeToJson(res.data);
        var arr = [];
        var trueJson = shishenluJson.data;
        for(var i in trueJson){
          arr.push(trueJson[i]);
        }
        that.setData({
          shiShenLuInfo:arr,
          icon
        },()=>{
          // 将皮肤的初始化数据放在回调函数中，防止因为获取皮肤数据的接口出问题，导致式神的相关数据没有初始化
          that.setData(
            {
              currentPifuUrl:that.data.piFuInfo[0]['imageUrl'],
              currentTit:that.data.piFuInfo[0]['title'],
              currentDesc:that.data.piFuInfo[0]['comment'],
              currentId:that.data.piFuInfo[0]['id']
            }
          );
        });
        console.log(that.data.shiShenLuInfo);
        if(wx.getStorageSync('shishen')){
          return;
        }else{
          wx.setStorageSync('shishen', arr)
        }
      },
      complete:function(){
        that.setIndicators();
        that.getWeekFreeTime();
      }
    });
  },
	switchContent: function(e) {
		this.setData({
			currentId: e.currentTarget.dataset.id,
      currentPifuUrl:e.currentTarget.dataset.pifuurl,
      currentTit:e.currentTarget.dataset.tit,
      currentDesc:e.currentTarget.dataset.desc
		});
	},
  tabTap:function(e){
    // 点击切换选项卡
    this.setData({
      currentIndex:e.target.dataset.index,
    });
  },
  navigateTodetail:function(e){
    wx.navigateTo({
      url: '../detail/detail?id='+e.currentTarget.dataset.id
    })
  },
  getWeekFreeTime:function(){
    var d = new Date();
    var timeStr = formatTime(d);
    var freeTime = timeStr+' 05:00:00'
    console.log(freeTime);
    var freeMonth = timeStr.split('-')[1]+'月';
    var freeDay = timeStr.split('-')[2];
    var weekFreeTime = freeMonth+freeDay+'日-'+freeMonth+(parseInt(freeDay)+6)+'日'; 
    this.setData({
      freeTime,
      weekFreeTime
    });
  },
  navigateToSearch:function(){
    wx.switchTab({
      url: '../search/search'
    })
  },
  setIndicators:function(){
    var length = Math.ceil(this.data.shiShenLuInfo.length/16);
    var indicators =new Array(length);
    this.setData({
      indicators
    });
  },
  onShareAppMessage:function(){
    return {
      title:'阴阳友人帐',
      path:'/pages/index/index',
      imageUrl:'../../images/share.png'
    }
  }
})
