# 笔记本应用

此笔记本应用为学习 Meteor 全栈开发的练习作品。应用采用 Meteor 和 React 搭建而成。Meteor 处理后端的搭建以及前后端的数据通信。通过DDP (Distributed Data Protocol)，Meteor 采用了Websocket 通信协议，当后台数据变化时，可以自动向前端推送数据。利用此技术，本应用实现了前后端同步数据更新。同时，前端采用 miniMongo 技术，使得用户输入和交互实时发生无延迟，提升了用户体验。

React UI 状态管理采用了与 Meteor 搭配的 react-meteor-data，赞未采用Redux。另外，Meteor 的 Session 对象也用来实现前端的 UI 响应。

样式编写采用了 BEM 原则和移动端优先原则，同时对样式文件进行了模块化，保证了长期的开发维护和扩展。

应用开发过程中使用 Mocha 测试。配合expect.js 编写 Assertion。React 组件输出采用 enzyme.js 。

## [Demo](https://ray-notebook.herokuapp.com/)
## 部署运行

运行本应用需要在本地安装Meteor。克隆repo 到本地后，运行下面代码：

```
meteor npm install
```

```
meteor
```

## 运行测试

运行下面代码后，在浏览器 localhost:3000 查看测试结果。

```
npm test
```
## 文件结构

├── client  <!--- 客户端主入口 -->
│   ├── main.html 
│   ├── main.js
│   └── main.scss
├── imports
│   ├── api  <!--- 连接MongoDB数据库，并定义 CRUD 操作-->
│   │   ├── notes.js
│   │   ├── notes.test.js <!--- 测试文件，以下带test.js 后缀的文件同 -->
│   │   ├── users.js
│   │   └── users.test.js
│   ├── client
│   │   └── styles <!--- 样式文件 -->
│   ├── fixtures <!--- 测试数据 -->
│   │   └── fixtures.js
│   ├── routes 
│   │   └── routes.js <!--- 前端路由 -->
│   ├── startup
│   │   └── simple-schema-configuration.js <!--- SimpleSchema 验证插件的设置，用来验证邮箱和密码的输入 -->
│   └── ui <!--- UI 组件 -->
│       ├── Dashboard.js
│       ├── Editor.js
│       ├── Editor.test.js
│       ├── Login.js
│       ├── Login.test.js
│       ├── NotFound.js
│       ├── NoteList.js
│       ├── NoteList.test.js
│       ├── NoteListEmptyItem.js
│       ├── NoteListHeader.js
│       ├── NoteListHeader.test.js
│       ├── NoteListItem.js
│       ├── NoteListItem.test.js
│       ├── PrivateHeader.js
│       ├── PrivateHeader.test.js
│       ├── Signup.js
│       └── Signup.test.js
├── package.json
├── public
│   └── images
│       ├── bars.svg
│       ├── favicon.png
│       └── x.svg
├── readme.md
└── server <!--- 服务器配置文件 -->
    └── main.js

