import * as echarts from '../ec-canvas/echarts';

function initChart(canvas, width, height) {
    const chart = echarts.init(canvas, null, {
      width: width,
      height: height
    });
    canvas.setChart(chart);
  
    var option = {
        radar:[{
                indicator:[
                    {text:'控制 S',max:5},
                    {text:'生存 D',max:5},
                    {text:'增益 A',max:5},
                    {text:'B 输出',max:5},
                    {text:'C 敏捷',max:5}
                ],
                center:['50%','50%'],
                radius:'70%',
                startAngle:270,
                splitNumber:4,
                splitArea:{
                  show:false
                },
                name:{
                    textStyle:{
                        fontSize:15,
                        color:'#fff'
                    }
                }
            }],
        series:[
            {
                type:'radar',
                symbolSize:3,//拐点的大小
                lineStyle:{
                    color:'rgba(238, 148, 131,.5)'
                },
                itemStyle: {
                    normal: {
                        borderWidth:0,
                        areaStyle: {
                        color: 'rgba(163, 129, 136,.9)'
                        }
                    }
                },
                data:[
                    {
                        value:[5,4,3,5,3]
                        // value:this.data.singleData.point
                    }
                ]
            }
        ]

        };
    chart.setOption(option);
    var that = this;
    console.log(that.data.singleData);
    return chart;
  }
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
        console.log(shishenData);
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
        var chart = this.onInit;
        this.setData({
            singleData,
            cubeOn,
            cubeOff
        });
        console.log(this.data.singleData);



        

    },
    onInit:function(canvas, width, height){
        const chart = echarts.init(canvas, null, {
            width: width,
            height: height
          });
          canvas.setChart(chart);
          var option = {
            radar:[{
                    indicator:[
                        {text:'控制 S',max:5},
                        {text:'生存 D',max:5},
                        {text:'增益 A',max:5},
                        {text:'B 输出',max:5},
                        {text:'C 敏捷',max:5}
                    ],
                    center:['50%','50%'],
                    radius:'70%',
                    startAngle:270,
                    splitNumber:4,
                    splitArea:{
                      show:false
                    },
                    name:{
                        textStyle:{
                            fontSize:15,
                            color:'#fff'
                        }
                    }
                }],
            series:[
                {
                    type:'radar',
                    symbolSize:3,//拐点的大小
                    lineStyle:{
                        color:'rgba(238, 148, 131,.5)'
                    },
                    itemStyle: {
                        normal: {
                            borderWidth:0,
                            areaStyle: {
                            color: 'rgba(163, 129, 136,.9)'
                            }
                        }
                    },
                    data:[
                        {
                            value:[5,4,3,5,3]
                            // value:this.data.singleData.point
                        }
                    ]
                }
            ]
    
            };
        chart.setOption(option);
        return chart;
    }
});