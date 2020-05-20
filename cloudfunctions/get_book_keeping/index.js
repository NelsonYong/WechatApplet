// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  db.collection('book_keeping').where({
    publishInfo: {
      country: 'United States'
    }
  }).get({
    success: function(res) {
    // 输出 [{ "title": "The Catcher in the Rye", ... }]
    console.log(res)
   }
  })
}