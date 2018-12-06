import * as echarts from '../ec-canvas/echarts';

function initChart(canvas, width, height) {
    const chart = echarts.init(canvas, null, {
      width: width,
      height: height
    });
    canvas.setChart(chart);
  
    var option = {
            
        title:{
            text:'式神五维图'
        },
        legend:{
            data:'评分'
        },
        radar:[{
                indicator:[
                    {text:'S 输出',max:6},
                    {text:'增益 D',max:6},
                    {text:'生存 B',max:6},
                    {text:'控制 S',max:6},
                    {text:'B 敏捷',max:6}
                ],
                center:['50%','60%'],
                radius:120,
                name:{
                    textStyle:{
                        fontSize:60,
                        color:'#fff'
                    }
                }
            }],
        series:[{
            type:'radar',
            data:{
                    value:[5,1,3,5,3],
                    name:'评分',
                }
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