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
                    {text:'S 输出',max:6},
                    {text:'增益 D',max:6},
                    {text:'生存 B',max:6},
                    {text:'控制 S',max:6},
                    {text:'B 敏捷',max:6}
                ],
                center:['50%','50%'],
                radius:75,
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
        series:[{
            type:'radar',
            symbolSize:4,//拐点的大小
            itemStyle: {
              normal: {
                // color: 'rgba(107, 45, 16)',
                areaStyle: {
                  color: 'rgba(161, 109, 87,.8)'
                }
              }
            },
            data:[
                {
                    value:[5.8,1,3,5,3]
                }
            ]
            }]

        };
    chart.setOption(option);
    return chart;
  }
Page({
    data:{
        ec:{
            onInit:initChart
        }
    } 
});