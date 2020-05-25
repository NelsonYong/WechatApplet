// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database()
  try {
    return await db.collection('book_keeping_data').where(event).get()
  } catch (error) {
    console.log(error)
  }
}