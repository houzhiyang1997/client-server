const mysql = require('mysql')

const poolSql = mysql.createPool({
  host: '106.12.140.161',
  port: '3306',
  user: 'root',
  password: '123456',
  database: 'cloud_chess'
})

function query(sql, value) {
  return new Promise((resolve, reject) => {
    poolSql.query(sql, value, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

module.exports = query
