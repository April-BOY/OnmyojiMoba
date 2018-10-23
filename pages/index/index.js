Page({
	data: {
    tab:[
      {
        name:"全新皮肤",
      },
      {
        name:"全新式神"
      },
      {
        name:"周免式神"
      },{
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
    qxssUrl:[]
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

				
				var pifuJson = that.unicodeToJson(res.data);
				// console.log(pifuJson.result);
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
    		var shishenluJson = that.unicodeToJson(res.data);
        // var newJson = that.unicodeToJson(shishenluJson.data);
        console.log(shishenluJson.data);
        var url = "https://ok.166.net/gameyw-gbox/moba/";
        var arr = [];
        // arr.push(newJson);
    		console.log(arr);
        for(var i = 0;i < shishenluJson.data.length;i++){
          if(shishenluJson.data[i].新式神){
            arr[i] = "url+shishenluJson.data[i].式神方头像";
            that.setData({
            	qxssUrl:arr
            });
          }
        }
        // console.log(arr.length);
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
	unicodeToJson: function(obj) {
		/**
		 * 解决返回的数据是 Unicode 编码的问题
		 */
		var start = obj.indexOf("{");
		var end = obj.lastIndexOf("}") + 1;
		var string = obj.slice(start, end);
		var json = JSON.parse(string);
		return json;
	},
  tabTap:function(e){
    this.setData({
      currentIndex:e.target.dataset.index,
    });
  },
})
