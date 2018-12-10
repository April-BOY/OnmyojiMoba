import {unicodeToJson,toggleRate} from '../../utils/util.js';
Page({
  data: {
	currentIndex:0,
	url:"https://ok.166.net/gameyw-gbox/moba/",
	rankData:[
		'https://ok.166.net/gameyw-gbox/moba/gui/res/head_circle/1071.png',
		"酒吞童子",
		"忍",
		"89.99%",
		"58.54%"
	],
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
	isUpRate:false,
	isPickRate:false,
	showSkeleton:true
  },

  onLoad: function (options) {
	var that = this;
    setTimeout(()=>{
      that.setData({
        showSkeleton:false
      });
    },1000);
	wx.request({
		// 获取式神圆头像、式神名称和式神ID的接口
		url: 'https://comp-sync.webapp.163.com/g78_hero/free_convey?callback=jQuery111308366921136572285_1540169781437&_=1540169781439',
		success: function(res) {
			var shiShenJson = unicodeToJson(res.data);
			var arr = [];
			var trueJson = shiShenJson.data;
			for(var i in trueJson){
				arr.push(trueJson[i]);
			}
			that.setData({
				shiShenInfo:arr
			});
		},
		complete:function(){
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
				var rawJson = JSON.parse(strJson);
				var rateJson = rawJson.data;
				var rateArr =[];
				for(var key in rateJson){
					rateArr.push({
						id:key,
						winrate:rateJson[key][0]['winrate'],
						pickrate:rateJson[key][2]['pickrate']
					});
				}
				that.setData({
					rateInfo:rateArr
				});
				that.getRankData();
			}
		})
	},
	getRankData:function(){
		var that = this;
		// 对两个接口获取到的数据进行过滤
		var arr = [];
		var rankData = [];
		for(var i =0;i< this.data.shiShenInfo.length;i++){
			for(var j = 0;j < this.data.rateInfo.length;j++){
				if(this.data.shiShenInfo[i]['式神ID']==this.data.rateInfo[j]['id']){
					arr.push({
						head_circle:that.data.url+this.data.shiShenInfo[i]['式神圆头像'],
						name:this.data.shiShenInfo[i]['式神名称'],
						role:this.data.shiShenInfo[i]['式神定位'],
						winrate:this.data.rateInfo[j]['winrate'],
						pickrate:this.data.rateInfo[j]['pickrate']
					})
				}
			}
		}
		rankData = that.upRate(arr);
		this.setData({
			rankData
		});
	},
	upRate:function(rankData){
		var arr = rankData;
		var length = rankData.length;
		for(var i =0;i< length;i++){
			for(var j=0;j< length-1-i;j++){
				if(parseFloat(arr[j]['winrate'])<parseFloat(arr[j+1]['winrate'])){
					var temp = arr[j];
					arr[j] = arr[j+1];
					arr[j+1] = temp;
				}
			}
		}
		return arr;
	},
	toggleWinRate:function(e){
		var arr = this.data.rankData;
		var rankData = toggleRate(arr,this.data.isUpRate,e.target.dataset.rate);
		this.setData({
			isUpRate:!this.data.isUpRate,
			rankData
		});
	},
	togglePickRate:function(e){
		var arr = this.data.rankData;
		var rankData = toggleRate(arr,this.data.isPickRate,e.target.dataset.rate);
		this.setData({
			isPickRate:!this.data.isPickRate,
			rankData
		});
	},
	tabTap:function(e){
		this.setData({
			currentIndex:e.target.dataset.index,
		});
	}
})