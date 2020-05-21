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
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

   //调用add函数
  
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
        }
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  selectDate: function(e){
    console.log(e)
  }
})