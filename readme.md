# 笔记本应用

此笔记本应用为学习Meteor全栈开发的练习作品。应用采用 Meteor 和 React 搭建而成。Meteor 处理后端的搭建以及前后端的数据通信。通过DDP (Distributed Data Protocol)，Meteor使得前后端通信具备更多可能，当后台数据变化时，可以自动向前端推送数据。利用此技术，本应用实现了前后端同步数据更新。同时，前端采用 miniMongo 技术，使得用户输入和交互实时发生无延迟，提升了用户体验。

应用开发过程中使用 expect.js 和 enzyme.js 测试。

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
