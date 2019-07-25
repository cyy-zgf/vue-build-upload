const scpClient = require('scp2')  //打包自动上传工具
const ora = require('ora')  //node命令行loading等效果
const chalk = require('chalk')  //颜色插件
const server = require('./products')

const spinner = ora(`正在发布到${ process.env.NODE_ENV === 'prod' ? '生产' : '测试' }服务器`)
spinner.start()
scpClient.scp(
  './dist',  //这个路径是你需要上传到服务器的文件夹路径
  { 
    host: server.host,  //服务器ip地址
    port: server.port,  //服务器端口
    username: server.username,  //服务器的登录账号
    password: server.password,  //服务器的登录密码
    path: server.path  //服务器的目标路径
  },
  function (err) {
    spinner.stop()
    if (err) {
      console.log(chalk.red('发布失败.\n'))
      throw err
    } else {
      console.log(chalk.green(`成功发布到${ process.env.NODE_ENV === 'prod' ? '生产' : '测试' }服务器\n`))
    }
  }
)