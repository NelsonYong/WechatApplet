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
    swiperNum: [1,2],
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
    date: "" , // 记账时间
    dateRange: {
      start: "",
      end: ""
    }
    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      
this.setData();
    //调用云函数
     wx.cloud.callFunction({
             name:"get_book_keeping",
             data:{},
             success:function(res){
               console.log("调用成功",res)
             }
     })

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
  // 设置开始日期和结束日期
  // 获取当前日期
  var currentDate = new Date().toLocaleDateString().split("/");
  //  console.log(currentDate)

  // 开始日期
  var start = currentDate[0] - 1 + "-" + currentDate[1] + "-" + currentDate[2];
  // console.log(start)

  // 结束日期
  var end = currentDate.join("-");
  // console.log(end)

  // 设置data的值
  this.setData({
    dateRange: {
      start,
      end
    },
    date: end
  })
}


  
})