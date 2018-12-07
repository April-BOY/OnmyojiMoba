import {unicodeToJson} from '../../utils/util.js';
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
    url:"https://ok.166.net/gameyw-gbox/moba/"
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
				that.setData({
					piFuInfo: pifuJson.result,
        });
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
          /**
           * 0 {cv名字:(4) ["绿川光", "谢添天", "Liam Obrien", "강호철"],式神ID:1020}
           * 1 {cv名字:(4) ["立花慎之介", "边江", "Crispin Freeman", "김명준"],式神ID:1020}
           */
          arr.push(trueJson[i]);
        }
        that.setData({
          shiShenLuInfo:arr,
          currentPifuUrl:that.data.piFuInfo[0]['imageUrl'],
          currentTit:that.data.piFuInfo[0]['title'],
          currentDesc:that.data.piFuInfo[0]['comment'],
          currentId:that.data.piFuInfo[0]['id']
        });
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
  }
})
