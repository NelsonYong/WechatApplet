// miniprogram/pages/home/home.js
Page({


  /**
   * 页面的初始数据
   */
  data: {
    arr: [1,2,3,4,5,6,7,8,9,10],
    dateRange:{
      start: "",
      end: ""
    },
  
    bookKeepingData:[],
    isFirstLoad:true,
    date:"",
    money_type:{
      zhichu:0,
      shouru:0
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBookKeepingData()
    this.getmoneyType()

   
  },
  onHide:function(){
    this.getBookKeepingData(this.data.date)
    this.getmoneyType()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      this.setDate()
      this.getBookKeepingData(this.data.date)
      this.getMonth()
     
  },
  OnShow:function(){

    if(this.data.isFirstLoad){
    
     this.data.isFirstLoad=false
    }else{  
    
     
      this.getBookKeepingData(this.data.date)
      
    }
  
  },
  
selectdate:function(e){

    this.setData({
      date:e.detail.value,
    })
    this.getBookKeepingData(this.data.date)
    this.getmoneyType()
    this.getMonth()
 
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
    date:end_,
    dateRange:{
      start:start,
      end:end_
    }
  })
  },
  addzero:function(num){

    return num<10?("0"+num):num;
    
    },

getBookKeepingData:function(time){

  console.log(time)
  let that=this
  wx.cloud.callFunction({
    name:"get_book_data_home",
    data:{
      date:time
    },
    success:function(res){
    console.log("调用云函数成功",res)

    that.setData({
      bookKeepingData:res.result.data
    })
    that.getmoneyType()
    },
  
    })
    
},

getmoneyType:function(){

  let zhichu=0
  let shouru=0
for(var i=0;i<this.data.bookKeepingData.length;i++){

  if(this.data.bookKeepingData[i].costType=="zhichu"){
    zhichu=parseInt(zhichu)+parseInt(this.data.bookKeepingData[i].money)
  }
  else{
    shouru=parseInt(shouru)+parseInt(this.data.bookKeepingData[i].money)
  }
}
  console.log("支出",parseInt(zhichu))
  console.log("收入",parseInt(shouru))
  this.setData({

    money_type:{
      zhichu:zhichu,
      shouru:shouru
    }

  })


},

getMonth:function(){

  let month=this.data.date.slice(0,7)
  console.log(month)

}





})