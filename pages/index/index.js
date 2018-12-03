// let util = require('../../utils/util.js');
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
    currentPifuUrl:"https://nie.res.netease.com/r/pic/20181019/e71936c2-8663-40b5-ba1f-4d6eaf1bf1dc.png",
    currentTit:"新皮肤：妖狐 返校·情窦",
    currentDesc:"2018.10.19上架服装铺",
		currentId: "ea103f45-3382-4823-8a92-7e385db8af75",
    currentIndex:0,
    shiShenLuInfo:[],
    url:"https://ok.166.net/gameyw-gbox/moba/"
  },
	onLoad: function(getPifuData) {
		var that = this;
		wx.request({
			// url: 'https://comp-sync.webapp.163.com/g78_hero/free_convey?callback=jQuery111308366921136572285_1540169781437&_=1540169781439',
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
				// console.log(that.data.piFuInfo[0].comment);
        that.requestShiShenData();
		}
	});
  },
  requestShiShenData:function(){
    var that = this;
    wx.request({
    	/**
    	*  获取式神录中图片的接口
    	* var url = "https://ok.166.net/gameyw-gbox/moba/"; 
    	*/
      url: 'https://comp-sync.webapp.163.com/g78_hero/free_convey?callback=jQuery111308366921136572285_1540169781437&_=1540169781439',
    	success: function(res) {
        console.log(res);
    		var shishenluJson = unicodeToJson(res.data);
        var url = "https://ok.166.net/gameyw-gbox/moba/";
        var arr = [];
        var str = "";
        var trueJson = shishenluJson.data;
        for(var i in trueJson){
          /**
           * 0 {cv名字:(4) ["绿川光", "谢添天", "Liam Obrien", "강호철"],式神ID:1020}
           * 1 {cv名字:(4) ["立花慎之介", "边江", "Crispin Freeman", "김명준"],式神ID:1020}
           */
          arr.push(trueJson[i]);
        }
        that.setData({
          shiShenLuInfo:arr
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
	// unicodeToJson: function(obj) {
	// 	var start = obj.indexOf("{");
	// 	var end = obj.lastIndexOf("}") + 1;
	// 	var string = obj.slice(start, end);
	// 	var json = JSON.parse(string);
	// 	return json;
	// },
  tabTap:function(e){
    // 点击切换选项卡
    this.setData({
      currentIndex:e.target.dataset.index,
    });
  }
})
