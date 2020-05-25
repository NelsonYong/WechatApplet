// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const _=db.command
// 云函数入口函数
exports.main = async (event, context) => {

  try {
    return await db.collection('book_keeping_data').where({
      year_month:_.eq(event.year_month)
    }).get()
  } catch (error) {
    console.log(error)
  }
}