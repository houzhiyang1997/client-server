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

// 获取全部阵容列表
router.get('/getteams', async ctx => {
  ctx.status = 200
  try {
    let _sql = 'SELECT * FROM team'
    let _data = await poolSql(_sql)
    ctx.body = {
      errorMessage: '',
      result: true,
      teams: _data
    }
  } catch (error) {
    ctx.body = {
      errorMessage: '查询阵容列表失败',
      result: false,
      news: null
    }
  }
})

// 根据id获取英雄信息 兼容多个id与一个id
router.get('/getchessinfo', async ctx => {
  ctx.status = 200
  const _info = ctx.query
  try {
    let _sql = 'SELECT * FROM chess WHERE chessId=?'
    let _value = [_info.chessId]
    let _data = await poolSql(_sql, _value)
    ctx.body = {
      errorMessage: '',
      result: true,
      chessinfo: _data
    }
  } catch (error) {
    ctx.body = {
      errorMessage: '查询英雄信息失败',
      result: false,
      chessinfo: null
    }
  }
})

// 根据id获取羁绊信息 兼容多个id与一个id
router.get('/getraceinfo', async ctx => {
  ctx.status = 200
  const _info = ctx.query
  try {
    let _sql = 'SELECT * FROM race WHERE raceId in (?,?)'
    // 此处补0 是为了占位，防止split切开只有一个值
    let _value = [..._info.raceId.split(','), 0]
    let _data = await poolSql(_sql, _value)
    ctx.body = {
      errorMessage: '',
      result: true,
      raceinfo: _data
    }
  } catch (error) {
    ctx.body = {
      errorMessage: '查询羁绊信息失败',
      result: false,
      raceinfo: null
    }
  }
})

// 根据id获取职业信息 兼容多个id与一个id
router.get('/getjobinfo', async ctx => {
  ctx.status = 200
  const _info = ctx.query
  try {
    let _sql = 'SELECT * FROM jobs WHERE jobId in (?,?)'
    // 此处补0 是为了占位，防止split切开只有一个值
    let _value = [..._info.jobId.split(','), 0]
    let _data = await poolSql(_sql, _value)
    ctx.body = {
      errorMessage: '',
      result: true,
      jobinfo: _data
    }
  } catch (error) {
    ctx.body = {
      errorMessage: '查询职业信息失败',
      result: false,
      jobinfo: null
    }
  }
})

// 根据id获取装备信息 兼容多个id与一个id
router.get('/getequipinfo', async ctx => {
  ctx.status = 200
  const _info = ctx.query
  try {
    let _sql = 'SELECT * FROM equipment WHERE equipId in (?,?,?,?,?,?)'
    // 此处补0 是为了占位，防止split切开只有一个值
    let _value = [..._info.equipId.split(','), 0, 0, 0, 0, 0]
    let _data = await poolSql(_sql, _value)
    ctx.body = {
      errorMessage: '',
      result: true,
      equipinfo: _data
    }
  } catch (error) {
    ctx.body = {
      errorMessage: '查询装备信息失败',
      result: false,
      equipinfo: null
    }
  }
})

//监听端口
app.listen(5000, () => {
  console.log('服务启动，监听5000端口')
})
