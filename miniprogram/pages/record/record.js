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
        isActive: true
      },
      {
        title: "收入",
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
        isActive: true
      },
      {
        title: "微信钱包",
        isActive: false
      },
      {
        title: "支付宝",
        isActive: false
      },
      {
        title: "储蓄卡",
        isActive: false
      },
      {
        title: "信用卡",
        isActive: false
      }
    ],
    date:"", // 记账时间
    dateRange: {
      start: "",
      end: ""
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

//切换时间事件
selectdate:function(e){

  this.setData({
    date:e.detail.value
     
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

getBookkeepingType:function(){

  wx.showLoading({
    title: '加载中',
  })

  // 记录this指向
  let that = this;
  wx.cloud.callFunction({
    name:"get_book_data",
    data:{},
    success:function(res){

      //关闭加载框
      wx.hideLoading();
      console.log("调用云函数成功",res);
      //获取返回的数据
      let data = res.result.data;
      // 添加字段
      data.forEach(v =>{
        v.isAct = false;
      })

       // 声明一个空数组，用来存放处理好的数据
       let type = []; 
       let begin = 0; 
      while(begin < data.length){
        let tmp = data.slice(begin, begin+8);
        begin +=8
        type.push(tmp); // push: 数组添加数据
      }
      console.log(type)
   //修改bookKeepingData的数据
   that.setData({
    bookKeepingData: type
  })
  
    }
  })
},
 // 记账类型的点击事件
 selectBookKeepingType: function(e){

  console.log(e)

  // 获取bookKeepingData的值
  let bannerType = this.data.bookKeepingData;
  // 获取当前点击的类型对应第一重下标
  let index = e.currentTarget.dataset.index;
  // 获取当前点击的类型对应第二重下标
  let id = e.currentTarget.dataset.id;

  if(bannerType[index][id].isAct){  // 当前点击类型已激活，需取消激活
    bannerType[index][id].isAct = false;
    console.log("已取消")
  }else{
    for (let i = 0; i < bannerType.length; i++) {
      for (let j = 0; j < bannerType[i].length; j++) {
        if (bannerType[i][j].isAct) {
          bannerType[i][j].isAct = false;
          break;  // 找到isAct为true的时候就结束循环，不在查找
        }
      }
    }

    // 设置当前点击类型的对应的isAct 为true
    bannerType[index][id].isAct = true;

  }

 console.log(bannerType)

  // 将修改好的bannerType赋给data里的bookKeepingData
  this.setData({
    bookKeepingData: bannerType
  })

},


  
})