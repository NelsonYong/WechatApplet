// miniprogram/pages/record/record.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 标题数据
    tabData: [
      {
        title: "支出",
        type:"zhichu",
        isActive: true
      },
      {
        title: "收入",
        type:"shouru",
        isActive: false
      }
    ],
    n:[1,2,3,4,5,6,7,8,9,10],
    //页面个数
    bookKeepingData: [],
    swiperData:{
      indicatorDots: true, // 指示点的控制
      indicatorColor: "#dbdbdb",// 指示点颜色
      activeColor: "#FEDB5A"   // 选中的指示点颜色
    },
    tabItemData: [
      {
        title: "现金",
        type:"xianjin",
        isActive: true
      },
      {
        title: "微信钱包",
        type:"wx",
        isActive: false
      },
      {
        title: "支付宝",
        type:"zhifubao",
        isActive: false
      },
      {
        title: "储蓄卡",
        type:"chuxu",
        isActive: false
      },
      {
        title: "信用卡",
        type:"xinyong",
        isActive: false
      }
    ],
    date:"", // 记账时间
    today:"",
    test:"",
    isAuth:false,
    cloud_id:"",
   
    dateRange: {
      start: "",
      end: ""
    },
    info:{
      date:"",
      money:"",
      comment:""
    }
    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      
      this.setDate();
      this.getBookkeepingType();
      
     
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },
  onShow:function(){
    var that = this;
    // 查询用户是否已经授权
  wx.getSetting({
    success: function(res){
      console.log(res)
      console.log(res.authSetting["scope.userInfo"])
      if (res.authSetting["scope.userInfo"]){
        wx.getUserInfo({   // 获取用户信息接口
          success: function(r){
that.setData({
  isAuth:true
})

          }
        })
      }
     
      
    }
  })
   
  },
  onHide:function(){
    this.resetData()
    this.setDate({
      info:{
        date:this.data.today,
        money:"",
        comment:""
      }
    })
  },
  // 切换标题事件
  toggleTab: function(e){
    // event: 事件对象-->e
    // console.log(e)

   
    if (e.currentTarget.dataset.active){
        console.log("当前已激活");
        return;
    }

    let datas=e.currentTarget.dataset.name;
    // 获取tabData值
    let tabData = this.data[datas];
    //console.log(tabData);
    let index = e.currentTarget.dataset.index;  // 获取当前点击索引值
    // 把原先的为true的isActive改为false
   
   
    for(let i = 0; i < tabData.length; i++){
      if(tabData[i].isActive){
        tabData[i].isActive = false;
        break;
      }
    }
    
    //设置当前点击标签的isActive为true
    tabData[index].isActive = true;
    // console.log(tabData)
    // 设置tabData
    this.setData({
      [datas]:tabData
    })
  },
  getInfo:function(e){
   let title=e.currentTarget.dataset.title;
   this.data.info[title]=e.detail.value;
   console.log(this.data.info.money)
   //this.data.info.date=this.data.date;
    
   this.setData({
     info:this.data.info,
   })
   console.log(this.data.info);
  },

//切换时间事件
selectdate:function(e){

 
  this.setData({
    date:e.detail.value,
    info:{
      date:e.detail.value,
      money:"",
      comment:"",
      year_month:""
    }
  })
 
  
  
},
setDate: function(){
 //设置开始结束时间

  let time=new Date();//实例化时间
  //获取年份
   let year=time.getFullYear();
   //获取月份,月份从0开始要加1
   let month=time.getMonth()+1;
   //获取日
  let day=time.getDate();

  let start=(year-1)+"-"+this.addzero(month)+"-"+this.addzero(day);
  let end_=(year)+"-"+this.addzero(month)+"-"+this.addzero(day);
  this.data.today=end_;
  this.data.info.date=end_;
  this.setData({
    date:end_,
    dateRange:{
      start:start,
      end:end_
    },
    info:this.data.info
  })


  
},

addzero:function(num){

return num<10?("0"+num):num;

},

getBookkeepingType:function(){

  wx.showLoading({
    title: '加载中',
  })

 
  let that = this;
  wx.cloud.callFunction({
    name:"get_book_data",
    data:{},
    success:function(res){

  
      wx.hideLoading();
      console.log("调用云函数成功",res);
    
      let data = res.result.data;
     
      data.forEach(v =>{
        v.isAct = false;
      })

      
       let type = []; 
       let begin = 0; 
      while(begin < data.length){
        let tmp = data.slice(begin, begin+8);
        begin +=8
        type.push(tmp); 
      }
    
   
   that.setData({
    bookKeepingData: type
  })
  
    }
  })
},
 
 selectBookKeepingType: function(e){

  let bannerType = this.data.bookKeepingData;
  let index = e.currentTarget.dataset.index;
  let id = e.currentTarget.dataset.id;

  if(bannerType[index][id].isAct){  
    bannerType[index][id].isAct = false;
    console.log("已取消")
  }else{
    for (let i = 0; i < bannerType.length; i++) {
      for (let j = 0; j < bannerType[i].length; j++) {
        if (bannerType[i][j].isAct) {
          bannerType[i][j].isAct = false;
          break;  
        }
      }
    }

  
    bannerType[index][id].isAct = true;

  }




  this.setData({
    bookKeepingData: bannerType
  })

},

addBookKeeping: function(e){
  
  let data={};
  for(var i=0;i<this.data.tabData.length;i++){
    if(this.data.tabData[i].isActive){
      data.cost=this.data.tabData[i].title;
      data.costType=this.data.tabData[i].type;
    
    }
  }

  let isSelect=false;

  for(var i=0;i< this.data.bookKeepingData.length;i++){  
    for(var j=0;j< this.data.bookKeepingData[i].length;j++)
    {
          if( this.data.bookKeepingData[i][j].isAct)
          {
              data.iconId= this.data.bookKeepingData[i][j]._id;
              data.iconType= this.data.bookKeepingData[i][j].type;
              data.title= this.data.bookKeepingData[i][j].title;
              data.icon= this.data.bookKeepingData[i][j].icon_url;
              isSelect=true;
              break;
          }
    }
  }
if(!isSelect){
  wx.showLoading({
    title: '请选择类型',
    duration:2000,
    icon:"none"
  })
  return;
}

for(var i=0;i<this.data.tabItemData.length;i++){
  if(this.data.tabItemData[i].isActive){
    data.accountType=this.data.tabItemData[i].title;
    break;
  }
}

if(this.data.info.money==''){
  wx.showLoading({
    title: '请输入金额',
    duration:2000,
    icon:"none"
  })
  return;
}
this.data.info.year_month=this.data.info.date.slice(0,7)
for(let key in this.data.info){
  data[key]=this.data.info[key]
}

console.log(data)
wx.showLoading({
  title: '正在保存',
})
//调用云函数
let that=this;
wx.cloud.callFunction({

name:"add_book_data",
data:data,

success:function(res){

  wx.hideLoading()
   wx.showLoading({
     title: '保存成功',
     duration:2000,
     mask:"true"
   })
  console.log("云函数add_book_data调用成功",res)
  that.resetData()
}


})

 
  
 
},

//重置数据函数
resetData:function(){

 
  //重置消费类型
  this.data.tabData[0].isActive=true;
  this.data.tabData[1].isActive=false;

   // 重置记账类型数据
   for (var i = 0; i < this.data.bookKeepingData.length; i++) {
    for (var j = 0; j < this.data.bookKeepingData[i].length; j++) {
      if (this.data.bookKeepingData[i][j].isAct) {
        this.data.bookKeepingData[i][j].isAct = false;
        break;
      }
    }
  }

    // 重置账户选择
    // 获取账户选择的数据
    this.data.tabItemData[0].isActive = true;
    for (var i = 1; i < this.data.tabItemData.length; i++) {
      this.data.tabItemData[i].isActive = false;
   
    }

  let that=this;
  that.setData({
    tabData:that.data.tabData,
    bookKeepingData: that.data.bookKeepingData,
    tabItemData: that.data.tabItemData,
    info:{
          date:that.data.today,
          money:"",
          comment:""
    }
  })

},
onGetUserInfo: function (res) {
  console.log(res)
  if (res.detail.userInfo) {
    this.setData({
      isAuth: true,
      cloud_id:res.detail.cloudID
    })
  }
}

})