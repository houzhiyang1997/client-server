const mysql = require('mysql')

const poolSql = mysql.createPool({
  host: 'x.xx.xxx.xxx',
  port: '3306',
  user: 'root',
  password: 'xxxxxx',
  database: 'xxxxxx'
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
