// miniprogram/pages/my/my.js
import * as echarts from '../../ec-canvas/echarts';

let chart = null;
let chartTitle=['餐饮', '购物', '出行', '健康', '娱乐', '住房', '人情','交通','学习','投资']
let chartTest=null;
let chartShouru=[];
let chartZhichu=[];
let chart_1=[];
let chart_2=[];
let chart_3=[];

Page({

  data: {
    ec: {
      onInit: "",
      layload:true
    },
   
    date:"",
    dateRange:{
      start: "",
      end: ""
    },
    isAuth:false,
    bookKeepingData:[],
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.SetData()
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    // 查询用户是否已经授权
  wx.getSetting({
    success: function(res){
      console.log(res)
      console.log(res.authSetting["scope.userInfo"])
      if (res.authSetting["scope.userInfo"]){
        wx.getUserInfo({   // 获取用户信息接口
          success: function(r){
            wx.showLoading({
              title: '加载中',
              duration:3000
            })
            that.setDate()
            that.SetData()
            that.getChartData()
            that.test()

          }
        })
      }
      else{
       wx.showLoading({
         title: '请点击我的授权',
         duration:2000
       })
      }
      
    }
  })
   
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    var that = this;
    // 查询用户是否已经授权
  wx.getSetting({
    success: function(res){
      console.log(res)
      console.log(res.authSetting["scope.userInfo"])
      if (res.authSetting["scope.userInfo"]){
        wx.getUserInfo({   // 获取用户信息接口
          success: function(r){
            wx.showLoading({
              title: '加载中',
              duration:1000
            })
            that.setDate()
            that.SetData()
            that.getChartData()
            that.test()

          }
        })
      }
      else{
       wx.showLoading({
         title: '请点击我的授权',
         duration:2000
       })
      }
      
    }
  })
   
   
    //this.getChartData()
    //this.test()
  },

  initChart:function() {
    chartTest=this.selectComponent("#mychart-dom-bar")
    chartTest.init((canvas,width,height,dpr) =>{
     chart = echarts.init(canvas, null, {
       width: width,
       height: height,
       devicePixelRatio: dpr // new
     });
     canvas.setChart(chart);
     chart.setOption(this.getLineData(chartTitle,chartZhichu,chartShouru));
     return chart;
    });
 },
  getLineData:function(title,zhichu,shouru){
  var option = {
    color: [ '#FF3399', '#009966'],
   
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      },
      confine: true
    },
    legend: {
      data: ['收入', '支出']
    },
    grid: {
      left: 20,
      right: 35,
      bottom: 20,
      top: 40,
      containLabel: true
    },
    xAxis: [
      {
        type: 'value',
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    yAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        data: title,//['餐饮', '购物', '出行', '健康', '娱乐', '住房', '人情','交通','学习','投资'],
        axisLine: {
          lineStyle: {
            color: '#999'
          }
        },
        axisLabel: {
          color: '#666'
        }
      }
    ],
    series: [
    
      {
        name: '收入',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true,
            position: 'right'
           
          }
        },
        data: shouru,//,
        itemStyle: {
          /*emphasis: {
             color: '#FF3399'
          }*/
        }
      },
      {
        name: '支出',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true,
            position: 'left'
          }
        },
        data: zhichu,//[-200, -320, -201, -304, -900, -130],
        itemStyle: {
           /*emphasis: {
             color: '#67e0e3'
           }*/
        }
      }
    ]
  }
return option 
},
  setDate:function(){
  //调用add函数
    
      
    let time=new Date();//实例化时间
    //获取年份
     let year=time.getFullYear();
     //获取月份,月份从0开始要加1
     let month=time.getMonth()+1;
     //获取日
    let day=time.getDate();
  
    let start=(year-1)+"-"+this.addzero(month)+"-"+this.addzero(day);
    let end_=(year)+"-"+this.addzero(month)+"-"+this.addzero(day);
    this.setData({ 
      date:end_.slice(0,7),
      dateRange:{
        start:start,
        end:end_
      }
    })
    },
  addzero:function(num){
      return num<10?("0"+num):num;
      
  },
selectdate:function(e){
  this.setData({
    date:e.detail.value
  })
  //this.getChartData()
  this.test()
  console.log(this.data.date)
},

  SetData:function(){
  let data=this.initChart()
  this.setData({
    ec:{
      onInit:data
    }
  })
},


getChartData:function(){

  let that=this
  wx.cloud.callFunction({

     name:"get_Month_data",
     data:{
       year_month:this.data.date
     },
     success:function(res){

         that.setData({
           bookKeepingData:res.result.data
         })
          //that.SetChartData_Title()
         
     }
  })

},

/*SetChartData_Title:function(){
  let title_type=[]
  console.log(this.data.bookKeepingData)
  title_type.push(this.data.bookKeepingData[0].title)  
  for(var i=0;i<this.data.bookKeepingData.length;i++)
  {
    for(var j=0;j<title_type.length;j++)
    {
          if(title_type[j]!=this.data.bookKeepingData[i].title)
          {
            title_type.push(this.data.bookKeepingData[i].title)
            break
          } 
    }       
  }
  let oldArr=[]
  let newArr=[]
  //数组去重，再转化
  oldArr=new Set(title_type)
  newArr=Array.from(oldArr)
  chartTitle=newArr
  this.initChart()
},*/


test:function(){
  
  console.log(chartTitle)
  chart_1=[]
  chart_2=[]
  chart_3=[]
  for(var i=0;i<chartTitle.length;i++){
    this.SetChartData_zhichu(chartTitle[i])
  }
 
 
},


SetChartData_zhichu:function(title_data)
{
  let that=this
  let Arr=[]
  let sum=0
  let sum1=0
  wx.cloud.callFunction({
    name:"get_book_data_zhichu",
    data:{
      year_month:this.data.date,
      title:title_data
    },
    success:function(res){  
     
     Arr=res.result.data
     for(var i=0;i<Arr.length;i++)
     {
       if(Arr[i].costType==='zhichu')
       {
        sum=sum-parseInt(Arr[i].money)
       }
       if(Arr[i].costType==='shouru')
       {
        sum1=sum1+parseInt(Arr[i].money)
       }
      
     }
     
     chart_1.push(title_data)
     chart_2.push(parseInt(sum))
     chart_3.push(parseInt(sum1))
     chartTitle=chart_1
     chartZhichu=chart_2
     chartShouru=chart_3
     that.initChart()
     
  }
 })
},
onGetUserInfo: function (res) {
  wx.getUserInfo({
    success:function(res){
      if (res.detail.userInfo) {
        this.setData({
          isAuth: true
        })
      }
    }
  })
 
}


  


})