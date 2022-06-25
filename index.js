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
    let _sql_total =
      'SELECT count(id) as total FROM user_view WHERE (username LIKE CONCAT("%",?,"%") OR nickName LIKE CONCAT("%",?,"%"))'
    let _total = await poolSql(_sql_total, [_info.searchContent, _info.searchContent])
    // 分页查询 注意需要两个数字类型
    let offset = (Number(_info.pageNum) - 1) * Number(_info.pageSize)
    let _value = [_info.searchContent, _info.searchContent, Number(_info.pageSize), offset]
    let _sql_data =
      'SELECT * FROM user_view WHERE (username LIKE CONCAT("%",?,"%") OR nickName LIKE CONCAT("%",?,"%")) limit ? offset ?'
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

// 获取admin列表，带分页
router.get('/admin/getadmins', async ctx => {
  ctx.status = 200
  const _info = ctx.query
  try {
    //先查询总数
    let _sql_total =
      'SELECT count(id) as total FROM admin_view WHERE (admin LIKE CONCAT("%",?,"%") OR nickName LIKE CONCAT("%",?,"%"))'
    let _total = await poolSql(_sql_total, [_info.searchContent, _info.searchContent])
    // 分页查询 注意需要两个数字类型
    let offset = (Number(_info.pageNum) - 1) * Number(_info.pageSize)
    let _value = [_info.searchContent, _info.searchContent, Number(_info.pageSize), offset]
    let _sql_data =
      'SELECT * FROM admin_view WHERE (admin LIKE CONCAT("%",?,"%") OR nickName LIKE CONCAT("%",?,"%")) limit ? offset ?'
    let _data = await poolSql(_sql_data, _value)
    //将管理员级别进行映射处理
    _data.forEach(item => {
      item.level = item.level === 1 ? '超级管理员' : '次级管理员'
    })
    ctx.body = {
      errorMessage: '',
      result: true,
      admins: _data,
      total: _total[0].total
    }
  } catch (error) {
    ctx.body = {
      errorMessage: '查询管理员列表失败',
      result: false,
      admins: null,
      total: null
    }
  }
})

// 获取chess列表，带分页
router.get('/admin/getchesses', async ctx => {
  ctx.status = 200
  const _info = ctx.query
  try {
    //先查询总数
    let _sql_total =
      'SELECT count(id) as total FROM chess WHERE season=? AND (title LIKE CONCAT("%",?,"%") OR displayName LIKE CONCAT("%",?,"%"))'
    let _total = await poolSql(_sql_total, [_info.selectContent, _info.searchContent, _info.searchContent])
    // 分页查询 注意需要两个数字类型
    let offset = (Number(_info.pageNum) - 1) * Number(_info.pageSize)
    let _value = [_info.selectContent, _info.searchContent, _info.searchContent, Number(_info.pageSize), offset]
    let _sql_data =
      'SELECT * FROM chess WHERE season=? AND (title LIKE CONCAT("%",?,"%") OR displayName LIKE CONCAT("%",?,"%")) limit ? offset ?'
    let _data = await poolSql(_sql_data, _value)
    ctx.body = {
      errorMessage: '',
      result: true,
      chesses: _data,
      total: _total[0].total
    }
  } catch (error) {
    ctx.body = {
      errorMessage: '查询英雄棋子列表失败',
      result: false,
      chesses: null,
      total: null
    }
  }
})

// 获取race列表，带分页
router.get('/admin/getraces', async ctx => {
  ctx.status = 200
  const _info = ctx.query
  try {
    //先查询总数
    let _sql_total =
      'SELECT count(id) as total FROM race WHERE season=? AND (name LIKE CONCAT("%",?,"%") OR introduce LIKE CONCAT("%",?,"%"))'
    let _total = await poolSql(_sql_total, [_info.selectContent, _info.searchContent, _info.searchContent])
    // 分页查询 注意需要两个数字类型
    let offset = (Number(_info.pageNum) - 1) * Number(_info.pageSize)
    let _value = [_info.selectContent, _info.searchContent, _info.searchContent, Number(_info.pageSize), offset]
    let _sql_data =
      'SELECT * FROM race WHERE season=? AND (name LIKE CONCAT("%",?,"%") OR introduce LIKE CONCAT("%",?,"%")) limit ? offset ?'
    let _data = await poolSql(_sql_data, _value)
    ctx.body = {
      errorMessage: '',
      result: true,
      races: _data,
      total: _total[0].total
    }
  } catch (error) {
    ctx.body = {
      errorMessage: '查询羁绊列表失败',
      result: false,
      races: null,
      total: null
    }
  }
})

// 获取job列表，带分页
router.get('/admin/getjobs', async ctx => {
  ctx.status = 200
  const _info = ctx.query
  try {
    //先查询总数
    let _sql_total =
      'SELECT count(id) as total FROM jobs WHERE season=? AND (name LIKE CONCAT("%",?,"%") OR introduce LIKE CONCAT("%",?,"%"))'
    let _total = await poolSql(_sql_total, [_info.selectContent, _info.searchContent, _info.searchContent])
    // 分页查询 注意需要两个数字类型
    let offset = (Number(_info.pageNum) - 1) * Number(_info.pageSize)
    let _value = [_info.selectContent, _info.searchContent, _info.searchContent, Number(_info.pageSize), offset]
    let _sql_data =
      'SELECT * FROM jobs WHERE season=? AND (name LIKE CONCAT("%",?,"%") OR introduce LIKE CONCAT("%",?,"%")) limit ? offset ?'
    let _data = await poolSql(_sql_data, _value)
    ctx.body = {
      errorMessage: '',
      result: true,
      jobs: _data,
      total: _total[0].total
    }
  } catch (error) {
    ctx.body = {
      errorMessage: '查询职业列表失败',
      result: false,
      jobs: null,
      total: null
    }
  }
})

// 获取equip列表，带分页
router.get('/admin/getequips', async ctx => {
  ctx.status = 200
  const _info = ctx.query
  try {
    //先查询总数
    let _sql_total =
      'SELECT count(id) as total FROM equipment WHERE season=? AND (name LIKE CONCAT("%",?,"%") OR effect LIKE CONCAT("%",?,"%"))'
    let _total = await poolSql(_sql_total, [_info.selectContent, _info.searchContent, _info.searchContent])
    // 分页查询 注意需要两个数字类型
    let offset = (Number(_info.pageNum) - 1) * Number(_info.pageSize)
    let _value = [_info.selectContent, _info.searchContent, _info.searchContent, Number(_info.pageSize), offset]
    let _sql_data =
      'SELECT * FROM equipment WHERE season=? AND (name LIKE CONCAT("%",?,"%") OR effect LIKE CONCAT("%",?,"%")) limit ? offset ?'
    let _data = await poolSql(_sql_data, _value)
    ctx.body = {
      errorMessage: '',
      result: true,
      equips: _data,
      total: _total[0].total
    }
  } catch (error) {
    ctx.body = {
      errorMessage: '查询装备列表失败',
      result: false,
      equips: null,
      total: null
    }
  }
})

// 获取 hex 列表，带分页 和分等级
router.get('/admin/gethexes', async ctx => {
  ctx.status = 200
  const _info = ctx.query
  try {
    // 先看是否有等级查询条件
    let query = ''
    let _value_total = []
    // 分页查询 注意需要两个数字类型
    let offset = (Number(_info.pageNum) - 1) * Number(_info.pageSize)
    let _value_query = []
    if (_info.hexLevel === 'all') {
      //查询所有则不区分type
      query = 'season=?'
      _value_total = [_info.selectContent, _info.searchContent, _info.searchContent]
      _value_query = [_info.selectContent, _info.searchContent, _info.searchContent, Number(_info.pageSize), offset]
    } else {
      query = '(type=? AND season=?)'
      _value_total = [parseInt(_info.hexLevel), _info.selectContent, _info.searchContent, _info.searchContent]
      _value_query = [
        parseInt(_info.hexLevel),
        _info.selectContent,
        _info.searchContent,
        _info.searchContent,
        Number(_info.pageSize),
        offset
      ]
    }
    //先查询总数
    let _sql_total =
      'SELECT count(id) as total FROM hex WHERE ' +
      query +
      ' AND (name LIKE CONCAT("%",?,"%") OR description LIKE CONCAT("%",?,"%"))'
    let _total = await poolSql(_sql_total, _value_total)
    let _sql_data =
      'SELECT * FROM hex WHERE ' +
      query +
      ' AND (name LIKE CONCAT("%",?,"%") OR description LIKE CONCAT("%",?,"%")) limit ? offset ?'
    let _data = await poolSql(_sql_data, _value_query)
    ctx.body = {
      errorMessage: '',
      result: true,
      hexes: _data,
      total: _total[0].total
    }
  } catch (error) {
    ctx.body = {
      errorMessage: '查询海克斯列表失败',
      result: false,
      hexes: null,
      total: null
    }
  }
})

// 获取 小小英雄 列表，带分页、分星级、分品质
router.get('/admin/getheros', async ctx => {
  ctx.status = 200
  const _info = ctx.query
  try {
    // 先看是否有星级和品质查询条件
    let query = ''
    let _value_total = []
    // 分页查询 注意需要两个数字类型
    let offset = (Number(_info.pageNum) - 1) * Number(_info.pageSize)
    let _value_query = []
    if (_info.qualityContent === 'all' && _info.starContent === 'all') {
      //查询所有则不区分type
      query = ''
      _value_total = [_info.searchContent]
      _value_query = [_info.searchContent, Number(_info.pageSize), offset]
    } else if (_info.qualityContent === 'all' && _info.starContent !== 'all') {
      // 品质为全部 星级有条件
      query = 'star=? AND '
      _value_total = [parseInt(_info.starContent), _info.searchContent]
      _value_query = [parseInt(_info.starContent), _info.searchContent, Number(_info.pageSize), offset]
    } else if (_info.qualityContent !== 'all' && _info.starContent === 'all') {
      // 品质有条件 星级为全部
      query = 'quality=? AND '
      _value_total = [_info.qualityContent, _info.searchContent]
      _value_query = [_info.qualityContent, _info.searchContent, Number(_info.pageSize), offset]
    } else {
      // 都有条件
      query = '(quality=? AND star=?) AND '
      _value_total = [_info.qualityContent, parseInt(_info.starContent), _info.searchContent]
      _value_query = [
        _info.qualityContent,
        parseInt(_info.starContent),
        _info.searchContent,
        Number(_info.pageSize),
        offset
      ]
    }
    //先查询总数
    let _sql_total = 'SELECT count(id) as total FROM hero WHERE ' + query + '(name LIKE CONCAT("%",?,"%"))'
    console.log('total:' + _sql_total)
    let _total = await poolSql(_sql_total, _value_total)
    let _sql_data = 'SELECT * FROM hero WHERE ' + query + '(name LIKE CONCAT("%",?,"%")) limit ? offset ?'
    // console.log('data:' + _sql_data)
    let _data = await poolSql(_sql_data, _value_query)
    ctx.body = {
      errorMessage: '',
      result: true,
      heros: _data,
      total: _total[0].total
    }
  } catch (error) {
    ctx.body = {
      errorMessage: '查询小小英雄列表失败',
      result: false,
      heros: null,
      total: null
    }
  }
})

// 获取 散件装备 列表 取值为一个区间)
router.get('/admin/getformula', async ctx => {
  ctx.status = 200
  const _info = ctx.query
  try {
    let _sql = 'SELECT * FROM equipment WHERE season=? and (equipId>=501 and equipId<=509)'
    let _value = [_info.season]
    let _data = await poolSql(_sql, _value)
    ctx.body = {
      errorMessage: '',
      result: true,
      formula: _data
    }
  } catch (error) {
    ctx.body = {
      errorMessage: '查询散件装备失败',
      result: false,
      formula: null
    }
  }
})

// 添加用户
router.post('/admin/adduser', async ctx => {
  ctx.status = 200
  let _info = ctx.request.body
  try {
    let _sql = 'INSERT INTO user (username,password,nickName,level,exp,score,imgUrl) VALUES (?,?,?,?,?,?,?)'
    let _value = [_info.username, _info.password, _info.nickName, _info.level, _info.exp, _info.score, _info.imgUrl]
    console.log(_value)
    let _data = await poolSql(_sql, _value)
    console.log(_data)
    if (_data.affectedRows === 1) {
      ctx.body = {
        code: 200,
        errorMessage: '',
        result: true,
        count: _data.affectedRows
      }
    } else {
      ctx.body = {
        code: 401,
        errorMessage: '添加失败',
        result: false,
        count: null
      }
      return
    }
  } catch (error) {
    ctx.body = {
      code: 402,
      errorMessage: '添加失败',
      result: false,
      count: null
    }
  }
})

// 添加次级管理员
router.post('/admin/addadmin', async ctx => {
  ctx.status = 200
  let _info = ctx.request.body
  try {
    let _sql = 'INSERT INTO admin (admin,password,nickName,level,regDate,imgUrl) VALUES (?,?,?,?,?,?)'
    // level 为2为次级管理员 因为超级管理员只能插入次级管理员
    let _value = [_info.admin, _info.password, _info.nickName, 2, _info.regDate, _info.imgUrl]
    let _data = await poolSql(_sql, _value)
    if (_data.affectedRows === 1) {
      ctx.body = {
        code: 200,
        errorMessage: '',
        result: true,
        count: _data.affectedRows
      }
    } else {
      ctx.body = {
        code: 401,
        errorMessage: '添加失败',
        result: false,
        count: null
      }
      return
    }
  } catch (error) {
    ctx.body = {
      code: 402,
      errorMessage: '添加失败',
      result: false,
      count: null
    }
  }
})

// 添加新英雄棋子
router.post('/admin/addchess', async ctx => {
  ctx.status = 200
  let _info = ctx.request.body
  try {
    let _sql =
      'INSERT INTO chess (chessId,TFTID,title,displayName,name,raceIds,races,jobIds,jobs,price,skillName,' +
      'skillType,skillImage,skillDetail,life,magic,startMagic,armor,spellBlock,attack,attackSpeed,' +
      'attackRange,recEquip,attackData,lifeData,version,season) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
    // 将某些羁绊，职业，推荐装备的数组处理为字符串
    let _v_races = _info.races.join(',')
    let _v_jobs = _info.jobs.join(',')
    let _v_recEquip = _info.recEquip.join(',')
    let _value = [
      _info.chessId,
      _info.TFTID,
      _info.title,
      _info.displayName,
      _info.name,
      _info.raceIds,
      _v_races,
      _info.jobIds,
      _v_jobs,
      _info.price,
      _info.skillName,
      _info.skillType,
      _info.skillImage,
      _info.skillDetail,
      _info.life,
      _info.magic,
      _info.startMagic,
      _info.armor,
      _info.spellBlock,
      _info.attack,
      _info.attackSpeed,
      _info.attackRange,
      _v_recEquip,
      _info.attackData,
      _info.lifeData,
      _info.version,
      _info.season
    ]
    let _data = await poolSql(_sql, _value)
    if (_data.affectedRows === 1) {
      ctx.body = {
        code: 200,
        errorMessage: '',
        result: true,
        count: _data.affectedRows
      }
    } else {
      ctx.body = {
        code: 401,
        errorMessage: '添加失败',
        result: false,
        count: null
      }
      return
    }
  } catch (error) {
    ctx.body = {
      code: 402,
      errorMessage: '添加失败',
      result: false,
      count: null
    }
  }
})

// 添加新装备
router.post('/admin/addequip', async ctx => {
  ctx.status = 200
  let _info = ctx.request.body
  try {
    let _sql =
      'INSERT INTO equipment (equipId,type,name,effect,keywords,formula,imagePath,version,season) VALUES (?,?,?,?,?,?,?,?,?)'
    // 将某些formula的数组处理为字符串
    let _v_formula = _info.formula.join(',')
    let _value = [
      _info.equipId,
      _info.type,
      _info.name,
      _info.effect,
      _info.keywords,
      _v_formula,
      _info.imagePath,
      _info.version,
      _info.season
    ]
    let _data = await poolSql(_sql, _value)
    if (_data.affectedRows === 1) {
      ctx.body = {
        code: 200,
        errorMessage: '',
        result: true,
        count: _data.affectedRows
      }
    } else {
      ctx.body = {
        code: 401,
        errorMessage: '添加失败',
        result: false,
        count: null
      }
      return
    }
  } catch (error) {
    ctx.body = {
      code: 402,
      errorMessage: '添加失败',
      result: false,
      count: null
    }
  }
})

// 添加新海克斯
router.post('/admin/addhex', async ctx => {
  ctx.status = 200
  let _info = ctx.request.body
  try {
    let _sql = 'INSERT INTO hex (hexId,type,name,imgUrl,description,version,season) VALUES (?,?,?,?,?,?,?)'
    // 将某些formula的数组处理为字符串
    let _value = [_info.hexId, _info.type, _info.name, _info.imgUrl, _info.description, _info.version, _info.season]
    let _data = await poolSql(_sql, _value)
    if (_data.affectedRows === 1) {
      ctx.body = {
        code: 200,
        errorMessage: '',
        result: true,
        count: _data.affectedRows
      }
    } else {
      ctx.body = {
        code: 401,
        errorMessage: '添加失败',
        result: false,
        count: null
      }
      return
    }
  } catch (error) {
    ctx.body = {
      code: 402,
      errorMessage: '添加失败',
      result: false,
      count: null
    }
  }
})

// 添加新种族
router.post('/admin/addrace', async ctx => {
  ctx.status = 200
  let _info = ctx.request.body
  try {
    let _sql = 'INSERT INTO race (raceId,name,introduce,level,imagePath,version,season) VALUES (?,?,?,?,?,?,?)'
    // 将某些formula的数组处理为字符串
    let _value = [_info.raceId, _info.name, _info.introduce, _info.level, _info.imagePath, _info.version, _info.season]
    let _data = await poolSql(_sql, _value)
    if (_data.affectedRows === 1) {
      ctx.body = {
        code: 200,
        errorMessage: '',
        result: true,
        count: _data.affectedRows
      }
    } else {
      ctx.body = {
        code: 401,
        errorMessage: '添加失败',
        result: false,
        count: null
      }
      return
    }
  } catch (error) {
    ctx.body = {
      code: 402,
      errorMessage: '添加失败',
      result: false,
      count: null
    }
  }
})

// 添加新职业
router.post('/admin/addjob', async ctx => {
  ctx.status = 200
  let _info = ctx.request.body
  try {
    let _sql = 'INSERT INTO jobs (jobId,name,introduce,level,imagePath,version,season) VALUES (?,?,?,?,?,?,?)'
    // 将某些formula的数组处理为字符串
    let _value = [_info.jobId, _info.name, _info.introduce, _info.level, _info.imagePath, _info.version, _info.season]
    let _data = await poolSql(_sql, _value)
    if (_data.affectedRows === 1) {
      ctx.body = {
        code: 200,
        errorMessage: '',
        result: true,
        count: _data.affectedRows
      }
    } else {
      ctx.body = {
        code: 401,
        errorMessage: '添加失败',
        result: false,
        count: null
      }
      return
    }
  } catch (error) {
    ctx.body = {
      code: 402,
      errorMessage: '添加失败',
      result: false,
      count: null
    }
  }
})

// 根据id 获取用户信息
router.get('/admin/getuserbyid', async ctx => {
  ctx.status = 200
  const _info = ctx.query
  try {
    let _sql = 'SELECT * FROM user WHERE id=?'
    let _value = [_info.id]
    let _data = await poolSql(_sql, _value)
    ctx.body = {
      errorMessage: '',
      result: true,
      user: _data[0]
    }
  } catch (error) {
    ctx.body = {
      errorMessage: '查询用户详情失败',
      result: false,
      user: null
    }
  }
})

// 根据id 获取 管理员 信息
router.get('/admin/getadminbyid', async ctx => {
  ctx.status = 200
  const _info = ctx.query
  try {
    let _sql = 'SELECT * FROM admin WHERE id=?'
    let _value = [_info.id]
    let _data = await poolSql(_sql, _value)
    //将管理员级别进行映射处理
    _data[0].level = _data[0].level === 1 ? '超级管理员' : '次级管理员'
    ctx.body = {
      errorMessage: '',
      result: true,
      admin: _data[0]
    }
  } catch (error) {
    ctx.body = {
      errorMessage: '查询管理员详情失败',
      result: false,
      admin: null
    }
  }
})

// 根据id 获取 英雄棋子 信息
router.get('/admin/getchessbyid', async ctx => {
  ctx.status = 200
  const _info = ctx.query
  try {
    let _sql = 'SELECT * FROM chess WHERE id=?'
    let _value = [_info.id]
    let _data = await poolSql(_sql, _value)
    ctx.body = {
      errorMessage: '',
      result: true,
      chess: _data[0]
    }
  } catch (error) {
    ctx.body = {
      errorMessage: '查询英雄棋子详情失败',
      result: false,
      chess: null
    }
  }
})

// 根据id 获取 装备 信息
router.get('/admin/getequipbyid', async ctx => {
  ctx.status = 200
  const _info = ctx.query
  try {
    let _sql = 'SELECT * FROM equipment WHERE id=?'
    let _value = [_info.id]
    let _data = await poolSql(_sql, _value)
    ctx.body = {
      errorMessage: '',
      result: true,
      equip: _data[0]
    }
  } catch (error) {
    ctx.body = {
      errorMessage: '查询装备详情失败',
      result: false,
      equip: null
    }
  }
})

// 根据id 获取 海克斯 信息
router.get('/admin/gethexbyid', async ctx => {
  ctx.status = 200
  const _info = ctx.query
  try {
    let _sql = 'SELECT * FROM hex WHERE id=?'
    let _value = [_info.id]
    let _data = await poolSql(_sql, _value)
    ctx.body = {
      errorMessage: '',
      result: true,
      hex: _data[0]
    }
  } catch (error) {
    ctx.body = {
      errorMessage: '查询海克斯详情失败',
      result: false,
      hex: null
    }
  }
})

// 根据id 获取 种族race 信息
router.get('/admin/getracebyid', async ctx => {
  ctx.status = 200
  const _info = ctx.query
  try {
    let _sql = 'SELECT * FROM race WHERE id=?'
    let _value = [_info.id]
    let _data = await poolSql(_sql, _value)
    ctx.body = {
      errorMessage: '',
      result: true,
      race: _data[0]
    }
  } catch (error) {
    ctx.body = {
      errorMessage: '查询种族详情失败',
      result: false,
      race: null
    }
  }
})

// 根据id 获取 职业job 信息
router.get('/admin/getjobbyid', async ctx => {
  ctx.status = 200
  const _info = ctx.query
  try {
    let _sql = 'SELECT * FROM jobs WHERE id=?'
    let _value = [_info.id]
    let _data = await poolSql(_sql, _value)
    ctx.body = {
      errorMessage: '',
      result: true,
      job: _data[0]
    }
  } catch (error) {
    ctx.body = {
      errorMessage: '查询职业详情失败',
      result: false,
      job: null
    }
  }
})

// 根据id 修改用户信息
router.post('/admin/edituser', async ctx => {
  ctx.status = 200
  let _info = ctx.request.body
  try {
    let _sql = 'UPDATE user SET nickName=?,level=?,exp=?,score=?,imgUrl=? WHERE id=?'
    let _value = [_info.nickName, _info.level, _info.exp, _info.score, _info.imgUrl, _info.id]
    let _data = await poolSql(_sql, _value)
    if (_data.affectedRows === 1) {
      ctx.body = {
        code: 200,
        errorMessage: '',
        result: true,
        count: _data.affectedRows
      }
    } else {
      ctx.body = {
        code: 401,
        errorMessage: '修改用户信息失败',
        result: false,
        count: null
      }
      return
    }
  } catch (error) {
    ctx.body = {
      code: 402,
      errorMessage: '修改用户信息失败',
      result: false,
      count: null
    }
  }
})

// 根据id 修改管理员信息
router.post('/admin/editadmin', async ctx => {
  ctx.status = 200
  let _info = ctx.request.body
  try {
    let _sql = 'UPDATE admin SET password=?,nickName=?,regDate=?,imgUrl=? WHERE id=?'
    let _value = [_info.password, _info.nickName, _info.regDate, _info.imgUrl, _info.id]
    let _data = await poolSql(_sql, _value)
    if (_data.affectedRows === 1) {
      ctx.body = {
        code: 200,
        errorMessage: '',
        result: true,
        count: _data.affectedRows
      }
    } else {
      ctx.body = {
        code: 401,
        errorMessage: '修改管理员信息失败',
        result: false,
        count: null
      }
      return
    }
  } catch (error) {
    ctx.body = {
      code: 402,
      errorMessage: '修改管理员信息失败',
      result: false,
      count: null
    }
  }
})

// 根据id 修改 英雄棋子 信息
router.post('/admin/editchess', async ctx => {
  ctx.status = 200
  let _info = ctx.request.body
  try {
    let _sql =
      'UPDATE chess SET chessId=?,TFTID=?,title=?,displayName=?,name=?,raceIds=?,races=?,jobIds=?,jobs=?,price=?,skillName=?,' +
      'skillType=?,skillImage=?,skillDetail=?,life=?,magic=?,startMagic=?,armor=?,spellBlock=?,attack=?,attackSpeed=?,' +
      'attackRange=?,recEquip=?,attackData=?,lifeData=?,version=?,season=? WHERE id=?'

    // 将某些羁绊，职业，推荐装备的数组处理为字符串
    let _v_races = _info.races.join(',')
    let _v_jobs = _info.jobs.join(',')
    let _v_recEquip = _info.recEquip.join(',')
    let _value = [
      _info.chessId,
      _info.TFTID,
      _info.title,
      _info.displayName,
      _info.name,
      _info.raceIds,
      _v_races,
      _info.jobIds,
      _v_jobs,
      _info.price,
      _info.skillName,
      _info.skillType,
      _info.skillImage,
      _info.skillDetail,
      _info.life,
      _info.magic,
      _info.startMagic,
      _info.armor,
      _info.spellBlock,
      _info.attack,
      _info.attackSpeed,
      _info.attackRange,
      _v_recEquip,
      _info.attackData,
      _info.lifeData,
      _info.version,
      _info.season,
      _info.id
    ]
    let _data = await poolSql(_sql, _value)
    if (_data.affectedRows === 1) {
      ctx.body = {
        code: 200,
        errorMessage: '',
        result: true,
        count: _data.affectedRows
      }
    } else {
      ctx.body = {
        code: 401,
        errorMessage: '修改英雄棋子信息失败',
        result: false,
        count: null
      }
      return
    }
  } catch (error) {
    ctx.body = {
      code: 402,
      errorMessage: '修改英雄棋子信息失败',
      result: false,
      count: null
    }
  }
})

// 根据id 修改 装备 信息
router.post('/admin/editequip', async ctx => {
  ctx.status = 200
  let _info = ctx.request.body
  try {
    let _sql =
      'UPDATE equipment SET equipId=?,type=?,name=?,effect=?,keywords=?,formula=?,imagePath=?,version=?,season=? WHERE id=?'
    // 将装备的数组处理为字符串
    let _v_formula = _info.formula.join(',')
    let _value = [
      _info.equipId,
      _info.type,
      _info.name,
      _info.effect,
      _info.keywords,
      _v_formula,
      _info.imagePath,
      _info.version,
      _info.season,
      _info.id
    ]
    let _data = await poolSql(_sql, _value)
    if (_data.affectedRows === 1) {
      ctx.body = {
        code: 200,
        errorMessage: '',
        result: true,
        count: _data.affectedRows
      }
    } else {
      ctx.body = {
        code: 401,
        errorMessage: '修改装备信息失败',
        result: false,
        count: null
      }
      return
    }
  } catch (error) {
    ctx.body = {
      code: 402,
      errorMessage: '修改装备信息失败',
      result: false,
      count: null
    }
  }
})

// 根据id 修改 hex 信息
router.post('/admin/edithex', async ctx => {
  ctx.status = 200
  let _info = ctx.request.body
  try {
    let _sql = 'UPDATE hex SET hexId=?,type=?,name=?,imgUrl=?,description=?,version=?,season=? WHERE id=?'
    let _value = [
      _info.hexId,
      _info.type,
      _info.name,
      _info.imgUrl,
      _info.description,
      _info.version,
      _info.season,
      _info.id
    ]
    let _data = await poolSql(_sql, _value)
    if (_data.affectedRows === 1) {
      ctx.body = {
        code: 200,
        errorMessage: '',
        result: true,
        count: _data.affectedRows
      }
    } else {
      ctx.body = {
        code: 401,
        errorMessage: '修改hex信息失败',
        result: false,
        count: null
      }
      return
    }
  } catch (error) {
    ctx.body = {
      code: 402,
      errorMessage: '修改hex信息失败',
      result: false,
      count: null
    }
  }
})

// 根据id 修改 种族race 信息
router.post('/admin/editrace', async ctx => {
  ctx.status = 200
  let _info = ctx.request.body
  try {
    let _sql = 'UPDATE race SET raceId=?,name=?,introduce=?,level=?,imagePath=?,version=?,season=? WHERE id=?'
    let _value = [
      _info.raceId,
      _info.name,
      _info.introduce,
      _info.level,
      _info.imagePath,
      _info.version,
      _info.season,
      _info.id
    ]
    let _data = await poolSql(_sql, _value)
    if (_data.affectedRows === 1) {
      ctx.body = {
        code: 200,
        errorMessage: '',
        result: true,
        count: _data.affectedRows
      }
    } else {
      ctx.body = {
        code: 401,
        errorMessage: '修改种族信息失败',
        result: false,
        count: null
      }
      return
    }
  } catch (error) {
    ctx.body = {
      code: 402,
      errorMessage: '修改种族信息失败',
      result: false,
      count: null
    }
  }
})

// 根据id 修改 职业job 信息
router.post('/admin/editjob', async ctx => {
  ctx.status = 200
  let _info = ctx.request.body
  try {
    let _sql = 'UPDATE jobs SET jobId=?,name=?,introduce=?,level=?,imagePath=?,version=?,season=? WHERE id=?'
    let _value = [
      _info.jobId,
      _info.name,
      _info.introduce,
      _info.level,
      _info.imagePath,
      _info.version,
      _info.season,
      _info.id
    ]
    let _data = await poolSql(_sql, _value)
    if (_data.affectedRows === 1) {
      ctx.body = {
        code: 200,
        errorMessage: '',
        result: true,
        count: _data.affectedRows
      }
    } else {
      ctx.body = {
        code: 401,
        errorMessage: '修改职业信息失败',
        result: false,
        count: null
      }
      return
    }
  } catch (error) {
    ctx.body = {
      code: 402,
      errorMessage: '修改职业信息失败',
      result: false,
      count: null
    }
  }
})

// 根据id删除用户信息
router.get('/admin/deleteuser', async ctx => {
  ctx.status = 200
  const _info = ctx.query
  try {
    let _sql = 'DELETE FROM user WHERE id=?'
    let _value = [_info.id]
    let _data = await poolSql(_sql, _value)
    ctx.body = {
      errorMessage: '',
      result: true,
      count: _data.affectedRows
    }
  } catch (error) {
    ctx.body = {
      errorMessage: '删除用户详情失败',
      result: false,
      count: null
    }
  }
})

// 根据id删除管理员信息
router.get('/admin/deleteadmin', async ctx => {
  ctx.status = 200
  const _info = ctx.query
  try {
    let _sql = 'DELETE FROM admin WHERE id=?'
    let _value = [_info.id]
    let _data = await poolSql(_sql, _value)
    ctx.body = {
      errorMessage: '',
      result: true,
      count: _data.affectedRows
    }
  } catch (error) {
    ctx.body = {
      errorMessage: '删除管理员详情失败',
      result: false,
      count: null
    }
  }
})

// 根据id删除 英雄棋子 信息
router.get('/admin/deletechess', async ctx => {
  ctx.status = 200
  const _info = ctx.query
  try {
    let _sql = 'DELETE FROM chess WHERE id=?'
    let _value = [_info.id]
    let _data = await poolSql(_sql, _value)
    ctx.body = {
      errorMessage: '',
      result: true,
      count: _data.affectedRows
    }
  } catch (error) {
    ctx.body = {
      errorMessage: '删除英雄棋子失败',
      result: false,
      count: null
    }
  }
})

// 根据id删除 装备 信息
router.get('/admin/deleteequip', async ctx => {
  ctx.status = 200
  const _info = ctx.query
  try {
    let _sql = 'DELETE FROM equipment WHERE id=?'
    let _value = [_info.id]
    let _data = await poolSql(_sql, _value)
    ctx.body = {
      errorMessage: '',
      result: true,
      count: _data.affectedRows
    }
  } catch (error) {
    ctx.body = {
      errorMessage: '删除装备失败',
      result: false,
      count: null
    }
  }
})

// 根据id删除 hex 信息
router.get('/admin/deletehex', async ctx => {
  ctx.status = 200
  const _info = ctx.query
  try {
    let _sql = 'DELETE FROM hex WHERE id=?'
    let _value = [_info.id]
    let _data = await poolSql(_sql, _value)
    ctx.body = {
      errorMessage: '',
      result: true,
      count: _data.affectedRows
    }
  } catch (error) {
    ctx.body = {
      errorMessage: '删除hex失败',
      result: false,
      count: null
    }
  }
})

// 根据id删除 race 信息
router.get('/admin/deleterace', async ctx => {
  ctx.status = 200
  const _info = ctx.query
  try {
    let _sql = 'DELETE FROM race WHERE id=?'
    let _value = [_info.id]
    let _data = await poolSql(_sql, _value)
    ctx.body = {
      errorMessage: '',
      result: true,
      count: _data.affectedRows
    }
  } catch (error) {
    ctx.body = {
      errorMessage: '删除race失败',
      result: false,
      count: null
    }
  }
})

// 根据id删除 job 信息
router.get('/admin/deletejob', async ctx => {
  ctx.status = 200
  const _info = ctx.query
  try {
    let _sql = 'DELETE FROM jobs WHERE id=?'
    let _value = [_info.id]
    let _data = await poolSql(_sql, _value)
    ctx.body = {
      errorMessage: '',
      result: true,
      count: _data.affectedRows
    }
  } catch (error) {
    ctx.body = {
      errorMessage: '删除job失败',
      result: false,
      count: null
    }
  }
})

/* 


----------------------------------------client


*/
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
