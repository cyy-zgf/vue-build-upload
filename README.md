## Vue项目实现一键式打包、发布至服务器脚本
- 下载脚本`(放在项目根目录)`

- 配置服务器信息
  ```js
  //打开deoply文件夹下的product.js文件
  //配置对应的服务器信息
    const SERVER_LIST =   [
      {
        id: 0,
        name: 'A-开发环境',
        domain: '',   //服务器域名
        host: '888.888.888.888', //服务器ip地址
        port: 22,  //端口
        username: 'root',   //服务器登录账号
        password: 'root',  //服务器登录密码
        path: '/usr/local/web' //服务器存放目录的目标路径
      },
      {
        id: 1,
        name: 'B-生产环境',
        domain: '',
        host: '888.888.888.888', //ip地址
        port: 22,  //端口
        username: 'root',
        password: 'root',
        path: '/usr/local/web'
      }
    ]
  ```

- 配置本地要上传的文件路径
  ![](http://cdn.hlymp.com/srctest.jpg)

- 安装需要的依赖
  ```
    yarn add cross-env scp2 ora    下载对应安装包
  ```

- 在package.json内添加对应的命令行
  ```js 
    //dev为开发环境   prod为生产环境
    "deploy:dev": "npm run build && cross-env NODE_ENV=dev node ./deploy",  
    "deploy:prod": "npm run build && cross-env NODE_ENV=prod node ./deploy"
  ```

- 运行结果
    ![](http://cdn.hlymp.com/1564041326%281%29.jpg)















