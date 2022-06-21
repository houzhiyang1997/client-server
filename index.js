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

// 获取用户列表，带分页
router.get('/admin/getusers', async ctx => {
  ctx.status = 200
  const _info = ctx.query
  try {
    //先查询总数
    let _sql_total = 'SELECT count(id) as total FROM user_view'
    let _total = await poolSql(_sql_total)
    // 分页查询 注意需要两个数字类型
    let offset = (Number(_info.pageNum) - 1) * Number(_info.pageSize)
    let _value = [Number(_info.pageSize), offset]
    let _sql_data = 'SELECT * FROM user_view limit ? offset ?'
    let _data = await poolSql(_sql_data, _value)
    ctx.body = {
      errorMessage: '',
      result: true,
      users: _data,
      total: _total[0].total
    }
  } catch (error) {
    ctx.body = {
      errorMessage: '查询用户列表失败',
      result: false,
      users: null,
      total: null
    }
  }
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
  const _info = ctx.query
  try {
    let _sql = 'SELECT * FROM team WHERE version=? order by goods DESC'
    let _value = [_info.version]
    let _data = await poolSql(_sql, _value)
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

// 根据id获取阵容详情
router.get('/getteambyid', async ctx => {
  ctx.status = 200
  const _info = ctx.query
  try {
    let _sql = 'SELECT * FROM team WHERE teamId=? and version=?'
    let _value = [_info.teamId, _info.version]
    let _data = await poolSql(_sql, _value)
    ctx.body = {
      errorMessage: '',
      result: true,
      teaminfo: _data
    }
  } catch (error) {
    ctx.body = {
      errorMessage: '查询阵容信息失败',
      result: false,
      teaminfo: null
    }
  }
})

// 获取全部英雄列表
router.get('/getallchess', async ctx => {
  ctx.status = 200
  const _info = ctx.query
  try {
    let _sql = 'SELECT * FROM chess WHERE version=?'
    let _value = [_info.version]
    let _data = await poolSql(_sql, _value)
    ctx.body = {
      errorMessage: '',
      result: true,
      allChess: _data
    }
  } catch (error) {
    ctx.body = {
      errorMessage: '查询所有英雄失败',
      result: false,
      allChess: null
    }
  }
})

// 根据id获取英雄信息 兼容多个id与一个id
router.get('/getchessinfo', async ctx => {
  ctx.status = 200
  const _info = ctx.query
  try {
    let _sql = 'SELECT * FROM chess WHERE version=? and chessId in (?,?,?,?,?,?,?,?,?)'
    let _value = [_info.version, ..._info.chessId.split(','), 0, 0, 0, 0, 0, 0, 0, 0]
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

// 获取全部羁绊列表
router.get('/getallrace', async ctx => {
  ctx.status = 200
  const _info = ctx.query
  try {
    let _sql = 'SELECT * FROM race WHERE version=?'
    let _value = [_info.version]
    let _data = await poolSql(_sql, _value)
    ctx.body = {
      errorMessage: '',
      result: true,
      allRace: _data
    }
  } catch (error) {
    ctx.body = {
      errorMessage: '查询所有羁绊失败',
      result: false,
      allRace: null
    }
  }
})

// 根据id获取羁绊信息 兼容多个id与一个id
router.get('/getraceinfo', async ctx => {
  ctx.status = 200
  const _info = ctx.query
  try {
    let _sql = 'SELECT * FROM race WHERE version=? and raceId in (?,?,?,?,?,?,?,?)'
    // 此处补0 是为了占位，防止split切开只有一个值
    let _value = [_info.version, ..._info.raceId.split(','), 0, 0, 0, 0, 0, 0, 0]
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

// 获取全部职业列表
router.get('/getalljob', async ctx => {
  ctx.status = 200
  const _info = ctx.query
  try {
    let _sql = 'SELECT * FROM jobs WHERE version=?'
    let _value = [_info.version]
    let _data = await poolSql(_sql, _value)
    ctx.body = {
      errorMessage: '',
      result: true,
      allJob: _data
    }
  } catch (error) {
    ctx.body = {
      errorMessage: '查询所有职业失败',
      result: false,
      allJob: null
    }
  }
})

// 根据id获取职业信息 兼容多个id与一个id
router.get('/getjobinfo', async ctx => {
  ctx.status = 200
  const _info = ctx.query
  try {
    let _sql = 'SELECT * FROM jobs WHERE version=? and jobId in (?,?,?,?,?,?,?,?)'
    // 此处补0 是为了占位，防止split切开只有一个值
    let _value = [_info.version, ..._info.jobId.split(','), 0, 0, 0, 0, 0, 0, 0]
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

// 获取全部装备列表(因为装备更新较快，取值为一个区间)
router.get('/getallequip', async ctx => {
  ctx.status = 200
  const _info = ctx.query
  try {
    let _sql =
      'SELECT * FROM equipment WHERE version=? and ((equipId>=501 and equipId<=509) or (equipId>=412 and equipId<=421) or (equipId>=519 and equipId<=531) or (equipId>=535 and equipId<=548) or (equipId>=551 and equipId<=562) or (equipId>=565 and equipId<=573) or (equipId>=577 and equipId<=584) or (equipId>=587 and equipId<=592) or (equipId>=6001 and equipId<=6025))'
    if (_info.version === '12.11') {
      _sql =
        'SELECT * FROM equipment WHERE version=? and ((equipId>=501 and equipId<=509) or (equipId>=412 and equipId<=421) or (equipId>=519 and equipId<=531) or (equipId>=535 and equipId<=548) or (equipId>=551 and equipId<=562) or (equipId>=565 and equipId<=573) or (equipId>=577 and equipId<=584) or (equipId>=587 and equipId<=592) or (equipId>=7001 and equipId<=7033)) order by equipId DESC'
    }
    let _value = [_info.version]
    let _data = await poolSql(_sql, _value)
    ctx.body = {
      errorMessage: '',
      result: true,
      allEquip: _data
    }
  } catch (error) {
    ctx.body = {
      errorMessage: '查询所有装备失败',
      result: false,
      allEquip: null
    }
  }
})

// 根据id获取装备信息 兼容多个id与一个id
router.get('/getequipinfo', async ctx => {
  ctx.status = 200
  const _info = ctx.query
  try {
    let _sql = 'SELECT * FROM equipment WHERE version=? and equipId in (?,?,?,?,?,?)'
    // 此处补0 是为了占位，防止split切开只有一个值
    let _value = [_info.version, ..._info.equipId.split(','), 0, 0, 0, 0, 0]
    let _data = await poolSql(_sql, _value)
    // 不能用foreach 因为foreach是同步的
    // 但是使用let 或者闭包的原理可以实现
    let _formula = []
    for (let i = 0; i < _data.length; i++) {
      _formula.push(await poolSql(_sql, [_info.version, ..._data[i].formula.split(','), 0, 0, 0, 0, 0]))
    }

    ctx.body = {
      errorMessage: '',
      result: true,
      equipinfo: _data,
      formula: _formula
    }
  } catch (error) {
    ctx.body = {
      errorMessage: '查询装备信息失败',
      result: false,
      equipinfo: error
    }
  }
})

// 获取全部hex列表
router.get('/getallhex', async ctx => {
  ctx.status = 200
  const _info = ctx.query
  try {
    let _sql = 'SELECT * FROM hex WHERE version=?'
    let _value = [_info.version]
    let _data = await poolSql(_sql, _value)
    ctx.body = {
      errorMessage: '',
      result: true,
      allHex: _data
    }
  } catch (error) {
    ctx.body = {
      errorMessage: '查询所有海克斯失败',
      result: false,
      allHex: null
    }
  }
})

// 根据id获取hex信息 兼容多个id与一个id
router.get('/gethexinfo', async ctx => {
  ctx.status = 200
  const _info = ctx.query
  try {
    let _sql = 'SELECT * FROM hex WHERE version=? and hexId in (?,?,?,?,?,?)'
    // 此处补0 是为了占位，防止split切开只有一个值
    let _value = [_info.version, ..._info.hexId.split(','), 0, 0, 0, 0, 0]
    let _data = await poolSql(_sql, _value)
    ctx.body = {
      errorMessage: '',
      result: true,
      hexinfo: _data
    }
  } catch (error) {
    ctx.body = {
      errorMessage: '查询hex信息失败',
      result: false,
      hexinfo: null
    }
  }
})

// 查询协同英雄信息
router.get('/getsimilar', async ctx => {
  ctx.status = 200
  const _info = ctx.query
  try {
    // 使用模糊查询匹配关键词 之所以不用id匹配是因为在此处匹配1会匹配到11,且文本匹配可以起到同样效果
    // 但是会导致在查询出同样的两个本英雄信息 需要前端传递id过来再进行filter
    let _sql_race =
      'SELECT * FROM chess WHERE version=? and (races LIKE CONCAT("%",?,"%") OR races LIKE CONCAT("%",?,"%"))'
    let _sql_job =
      'SELECT * FROM chess WHERE version=? and (jobs LIKE CONCAT("%",?,"%") OR jobs LIKE CONCAT("%",?,"%"))'
    // 此处补0 是为了占位，防止split切开只有一个值
    let _value_race = [_info.version, ..._info.races.split(','), 0] //获取race参数
    let _value_job = [_info.version, ..._info.jobs.split(','), 0] // 获取job参数
    let _value_id = _info.id //获取id用于过筛
    let _data_job = await poolSql(_sql_job, _value_job)
    let _data_race = await poolSql(_sql_race, _value_race)
    // 这里比较奇怪 !== 不能匹配到数据
    const result = [..._data_job, ..._data_race].filter(item => item.chessId != _value_id)
    ctx.body = {
      errorMessage: '',
      result: true,
      similarinfo: result //展开合并为一个数组
    }
  } catch (error) {
    ctx.body = {
      errorMessage: '查询协同英雄信息失败',
      result: false,
      similarinfo: null
    }
  }
})

// 获取全部小小英雄列表
router.get('/getallhero', async ctx => {
  ctx.status = 200
  try {
    let _sql = 'SELECT * FROM hero order by miniId'
    let _data = await poolSql(_sql)
    ctx.body = {
      errorMessage: '',
      result: true,
      allHero: _data
    }
  } catch (error) {
    ctx.body = {
      errorMessage: '查询所有小小英雄失败',
      result: false,
      allHero: null
    }
  }
})

// 登录接口
router.post('/login', async ctx => {
  ctx.status = 200
  let _info = ctx.request.body
  try {
    let _sql = 'SELECT * FROM user where username=?'
    let _username = [_info.username]
    let _data = await poolSql(_sql, _username)
    if (_info.password === _data[0].password) {
      ctx.body = {
        code: 200,
        errorMessage: '',
        result: true,
        data: _data[0],
        token: Date.now()
      }
    } else {
      ctx.body = {
        code: 401,
        errorMessage: '用户名或密码错误',
        result: false,
        data: null
      }
      return
    }
  } catch (error) {
    ctx.body = {
      code: 402,
      errorMessage: '登录失败',
      result: false,
      data: null
    }
  }
})

// 根据id获取用户信息
router.get('/getuserinfo', async ctx => {
  ctx.status = 200
  const _info = ctx.query
  try {
    let _sql = 'SELECT * FROM user WHERE id=?'
    let _value = [_info.id]
    let _data = await poolSql(_sql, _value)
    ctx.body = {
      errorMessage: '',
      result: true,
      userInfo: _data
    }
  } catch (error) {
    ctx.body = {
      errorMessage: '查询user信息失败',
      result: false,
      userInfo: null
    }
  }
})

//监听端口
app.listen(5000, () => {
  console.log('服务启动，监听5000端口')
})
