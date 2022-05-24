// 引入模块
const Koa = require('koa')
const Router = require('koa-router')
//数据库相关
const poolSql = require('./bd.js')
const cors = require('koa2-cors') //跨域
const bodyParser = require('koa-bodyparser') // 处理post put参数
// 实例化
const app = new Koa()
const router = new Router()
//配置路由
app.use(cors()).use(bodyParser()).use(router.routes()).use(router.allowedMethods())

//搭建服务
router.get('/index', async ctx => {
  ctx.status = 200
  ctx.body = '这是index'
})

// 获取全部新闻列表
router.get('/getnews', async ctx => {
  ctx.status = 200
  try {
    let _sql = 'SELECT * FROM news'
    let _data = await poolSql(_sql)
    ctx.body = {
      errorMessage: '',
      result: true,
      news: _data
    }
  } catch (error) {
    ctx.body = {
      errorMessage: '查询新闻列表失败',
      result: false,
      news: null
    }
  }
})

// 获取id获取新闻(详情)
router.get('/newsdetail', async ctx => {
  ctx.status = 200
  const _info = ctx.query
  try {
    let _sql = 'SELECT * FROM news WHERE id=?'
    let _value = [_info.id]
    let _data = await poolSql(_sql, _value)
    ctx.body = {
      errorMessage: '',
      result: true,
      detail: _data
    }
  } catch (error) {
    ctx.body = {
      errorMessage: '查询新闻详情失败',
      result: false,
      news: null
    }
  }
})

router.post('/add', async ctx => {
  ctx.status = 200
  let _info = ctx.request.body
  if (!_info.name) {
    ctx.body = {
      errorMessage: '名称错误',
      result: false,
      data: null
    }
    return
  }
  try {
    let _sql = 'INSERT INTO commodity (name,number,price) VALUES (?,?,?)'
    let _value = [_info.name, _info.number, _info.price]
    await poolSql(_sql, _value)
    ctx.body = {
      errorMessage: '',
      result: true,
      data: null
    }
  } catch (error) {
    ctx.body = {
      errorMessage: '添加失败',
      result: false,
      data: null
    }
  }
})

router.post('/put', async ctx => {
  ctx.status = 200
  let _info = ctx.request.body
  if (!_info.id || !_info.name) {
    ctx.body = {
      errorMessage: 'id或名字为空',
      result: false,
      data: null
    }
    return
  }
  try {
    let _sql = 'UPDATE commodity SET name=?,number=?,price=? WHERE id=?'
    let _value = [_info.name, _info.number, _info.price, _info.id]
    await poolSql(_sql, _value)
    ctx.body = {
      errorMessage: '',
      result: true,
      data: null
    }
  } catch (error) {
    ctx.body = {
      errorMessage: '更新失败',
      result: false,
      data: null
    }
  }
})

router.delete('/delete/:id', async ctx => {
  ctx.status = 200
  let _info = ctx.params
  try {
    let _sql = 'DELETE FROM commodity WHERE id=?'
    let _value = [_info.id]
    await poolSql(_sql, _value)
    ctx.body = {
      errorMessage: '',
      result: true,
      data: null
    }
  } catch (error) {
    ctx.body = {
      errorMessage: '删除失败',
      result: false,
      data: null
    }
  }
})

//监听端口
app.listen(5000, () => {
  console.log('服务启动，监听5000端口')
})
