import * as echarts from '../../component/ec-canvas/echarts';

  // dataList必须声明在这里，声明在onLoad中则无法使用
var dataList = [];
Page({
    data:{
        singleData:{},
        ec:{
            lazyLoad:true
        },
        cubeOn:[],
        cubeOff:[],
        url:"https://ok.166.net/gameyw-gbox/moba/"
    },
    onLoad:function(option){
        var shishenData = wx.getStorageSync('shishen');
        var detailData = [];
        var singleData = {};
        for(var i=0;i < shishenData.length;i++){
            // 过滤缓存中的数据
            detailData.push(
                {
                    id:shishenData[i]['式神ID'],
                    name:shishenData[i]['式神名称'],
                    new:shishenData[i]['新式神'],
                    japanCV:shishenData[i]['cv名字'][0],
                    chinaCV:shishenData[i]['cv名字'][1],
                    head_fang:this.data.url+shishenData[i]['式神方头像'],
                    position:shishenData[i]['式神定位'][0],
                    tag:shishenData[i]['式神标签'],
                    path:shishenData[i]['式神攻略'].split('#r')[1].split('：')[1],
                    diff:shishenData[i]['评分']['难度'],
                    tip:shishenData[i]['式神攻略'].split('#r')[2].split('：')[1],
                    point:[
                        shishenData[i]['评分']['控制'],
                        shishenData[i]['评分']['生存'],
                        shishenData[i]['评分']['增益'],
                        shishenData[i]['评分']['输出'],
                        shishenData[i]['评分']['敏捷'],
                    ]
                }
            );
        }
        for(var j =0;j<detailData.length;j++){
            // 判断传过来的id是否与当前式神数据的id一致，如果一致，则遍历到页面
            if(option.id==detailData[j]['id']){
                singleData = detailData[j];
            }
        }
        var cubeOn = new Array(singleData.diff);
        var cubeOff = new Array(5-singleData.diff);
        dataList = singleData.point;
        this.ecComponent = this.selectComponent('#mychart-dom-detail');//获取组件
        this.onInit();//初始化雷达图
        this.setData({
            singleData,
            cubeOn,
            cubeOff
        });
    },
    setRadarIndicatorText:function(text){
        switch (text) {
          case 1:
            return 'D';
          case 2:
            return 'C';
          case 3:
            return 'B';
          case 4:
            return 'A';
          case 5:
            return 'S';
        }
    },
    onInit:function(){
      var that = this;
        this.ecComponent.init((canvas,width,height)=>{
          const chart = echarts.init(canvas, null, {
            width: width,
            height: height
          });
          canvas.setChart(chart);
          var control = that.setRadarIndicatorText(dataList[0]);
          var live = that.setRadarIndicatorText(dataList[1]);
          var plus = that.setRadarIndicatorText(dataList[2]);
          var attack = that.setRadarIndicatorText(dataList[3]);
          var agility = that.setRadarIndicatorText(dataList[4]);
          var option = {
            radar: [{
              indicator: [
                { text: '控制 '+control, max: 5 },
                { text: '生存 '+live, max: 5 },
                { text: '增益 '+plus, max: 5 },
                { text: attack+' 输出', max: 5 },
                { text: agility+' 敏捷', max: 5 }
              ],
              center: ['50%', '50%'],
              radius: '70%',
              startAngle: 270,
              splitNumber: 4,
              splitArea: {
                show: false
              },
              name: {
                textStyle: {
                  fontSize: 15,
                  color: '#fff'
                }
              }
            }],
            series: [
              {
                type: 'radar',
                symbolSize: 3,//拐点的大小
                lineStyle: {
                  color: 'rgba(238, 148, 131,.5)'
                },
                itemStyle: {
                  normal: {
                    borderWidth: 0,
                    areaStyle: {
                      color: 'rgba(163, 129, 136,.9)'
                    }
                  }
                },
                data: [
                  {
                    value: dataList
                  }
                ]
              }
            ]

          };
          chart.setOption(option);
          return chart;
        })
    }
});