// pages/rank/rank.js
import {unicodeToJson} from '../../utils/util.js';
Page({
  data: {
    tab:[
    	{
    		name:"全",
    	},
    	{
    		name:"侍"
    	},
    	{
    		name:"巫"
    	},
      {
    		name:"射"
    	},
      {
    		name:"忍"
    	},
      {
    		name:"守"
    	},
      {
    		name:"祝"
    	}
    ],
		currentIndex:0,
		shiShenInfo:[],
		url:"https://ok.166.net/gameyw-gbox/moba/",
		rateInfo:[]
  },

  onLoad: function (options) {
			var that = this;
			wx.request({
				// 获取式神圆头像、式神名称和式神ID的接口
				url: 'https://comp-sync.webapp.163.com/g78_hero/free_convey?callback=jQuery111308366921136572285_1540169781437&_=1540169781439',
				success: function(res) {
					var shiShenJson = unicodeToJson(res.data);
					var url = "https://ok.166.net/gameyw-gbox/moba/";
					var arr = [];
					var str = "";
					var trueJson = shiShenJson.data;
					// console.log(trueJson);
					for(var i in trueJson){
						/**
						 * 0 {cv名字:(4) ["绿川光", "谢添天", "Liam Obrien", "강호철"],式神ID:1020}
						 * 1 {cv名字:(4) ["立花慎之介", "边江", "Crispin Freeman", "김명준"],式神ID:1020}
						 */
						arr.push(trueJson[i]);
					}
					// console.log(arr)
					that.setData({
						shiShenInfo:arr
					});
					that.rate();
				}
			});
	},
	rate:function(){
		var that = this;
		wx.request({
			// 获取式神胜率和出场率的接口
			url: 'http://h5api.chatbot.nie.163.com/aitasks/tplcontext.lua?mid=g78_n3182_zhushou&key=0&act=get',
			success: function(res){
				var strJson = res.data.data;
				// console.log(res.data.data);
				var rawJson = JSON.parse(strJson);
				var rateJson = rawJson.data;
				var rateArr =[];
				// var rateArr = [
				// 	{
				// 		id:1001,
				// 		winrate:'190%',
				// 		pickrate:'32%'
				// 	},
				// 	{
				// 		id:1001,
				// 		winrate:'190%',
				// 		pickrate:'32%'
				// 	},
				// ]
				for(var key in rateJson){
					rateArr.push({
						id:key,
						winrate:rateJson[key][0]['winrate'],
						pickrate:rateJson[key][2]['pickrate']
					});
				}
				console.log(rateArr);
				that.setData({
					rateInfo:rateArr
				});
			}
		})
	},
  tabTap:function(e){
  	this.setData({
  		currentIndex:e.target.dataset.index,
  	});
  }
})