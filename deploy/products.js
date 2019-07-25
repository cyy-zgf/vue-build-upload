/**
 * 读取env环境变量
 */
const fs = require('fs')  //操作文件夹
const path = require('path')  //路径插件

//env 文件 判断打包环境指定对应的服务器id
const envfile = process.env.NODE_ENV === 'prod' ? './.env.prod' : './.env.dev'
//env 环境变量的路径
const envPath = path.resolve(__dirname, envfile)
//env 对象
const envObj = parse(fs.readFileSync(envPath, 'utf8'))
const SERVER_ID = parseInt(envObj['VUE_APP_SERVER_ID'])

function parse (src) {
  // 解析KET=VAL的文件
  const res = {}
  src.split('\n').forEach(line => {
    // matching "KEY' and 'VAL' in 'KEY=VAL'
    // eslint-disable-next-line no-useless-escape
    const keyValueArr = line.match(/^\s*([\w\.\-]+)\s*=\s*(.*)?\s*$/)
    // matched?
    if (keyValueArr != null) {
      const key = keyValueArr[1];
      let value = keyValueArr[2] || ''

      // expand newlines in quoted values
      const len = value ? value.length : 0
      if (len > 0 && value.charAt(0) === '"' && value.charAt(len - 1) === '"') {
        value = value.replace(/\\n/gm, '\n')
      }

      // remove any surrounding quotes and extra spaces
      value = value.replace(/(^['"]|['"]$)/g, '').trim()

      res[key] = value
    }
  })
  return res
}

/**
 * 定义多个服务器账号  及根据 SERVER_ID导出当前环境服务器账号
 */
const SERVER_LIST =   [
  {
    id: 0,
    name: 'A-开发环境',
    domain: '',
    host: '192.168.0.209', //ip地址
    port: 22,  //端口
    username: 'root',
    password: 'jlcx@90',
    path: '/usr/local/jl-webapps/zgf'
  },
  {
    id: 1,
    name: 'B-生产环境',
    domain: '',
    host: '192.168.0.209', //ip地址
    port: 22,  //端口
    username: 'root',
    password: 'jlcx@90',
    path: '/usr/local/jl-webapps/zgf'
  }
]

module.exports = SERVER_LIST[SERVER_ID]

// yarn add cross-env scp2 ora    下载对应安装包