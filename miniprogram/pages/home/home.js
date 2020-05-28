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
    monthMoneyData:[],
    isFirstLoad:true,
    date:"",
    money_type:{
      zhichu:0,
      shouru:0
    },
    month_money:{
      surplus:"",
      shouru:"",
      zhichu:""
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBookKeepingData(this.data.date)
    this.getmoneyType()
    this.getMonth_()
  },
  onShow:function(){
    this.getBookKeepingData(this.data.date)
    //this.getMonth_()
  },
  onHide:function(){

    //this.getBookKeepingData(this.data.date)
    this.getmoneyType()
   // this.getMonth_()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      this.setDate()
      this.getBookKeepingData(this.data.date)
      this.getMonth_()
    
  },
 
  
selectdate:function(e){

    this.setData({
      date:e.detail.value,
    })
    this.getBookKeepingData(this.data.date)
    this.getmoneyType()
    this.getMonth_()
 
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
  this.setData({

    money_type:{
      zhichu:zhichu,
      shouru:shouru
    }

  })


},

getMonth_:function(){

  this.getBookKeepingData(this.data.date)
  let month=this.data.date.slice(0,7)
  this.getMonthData(month)

},

getMonthData:function(month){
  console.log(month)
  let that=this
  wx.cloud.callFunction({
    name:"get_Month_data",
    data:{
      year_month:month
    },
    success:function(res){
    console.log("调用获取月云函数成功",res)
    that.setData({
      monthMoneyData:res.result.data
    })
    that.getMonthMoney()
    },
  
    })


},

getMonthMoney:function(){

  let zhichu=0
  let shouru=0
  let surplus=0
  let that=this
for(var i=0;i<this.data.monthMoneyData.length;i++){

  if(this.data.monthMoneyData[i].costType=="zhichu"){
    zhichu=parseInt(zhichu)+parseInt(this.data.monthMoneyData[i].money)
  }
  else{
    shouru=parseInt(shouru)+parseInt(this.data.monthMoneyData[i].money)
  }
}
  surplus=parseInt(shouru)-parseInt(zhichu)
  console.log("支出",parseInt(zhichu))
  console.log("收入",parseInt(shouru))
  console.log("结余",parseInt(surplus))

  that.setData({

    month_money:{
      surplus:surplus,
      zhichu:zhichu,
      shouru:shouru 
    }

  })
},


test:function(e){

  let that=this
  wx.showModal({
    title:"删除该条信息",
    cancelText:"取消",
    confirmText:"确定",
    content:"点击完成",
    success:function(res){

      if(res.confirm){

        that.deleBookData(e.currentTarget.dataset.id)
      }

      if(res.cancel){
        console.log("取消操作")
      }
    
    }
  })
},

deleBookData:function(id){
  let that=this
  wx.cloud.callFunction({

    name:"delet_book_data",
    data:{
      id:id
    },
    success:function(res){
  
      console.log("调用删除数据成功",res)
      that.getBookKeepingData(that.data.date)
      wx.showLoading({
        title: '删除成功',
        duration:1000
      })
    }
  })


}





})