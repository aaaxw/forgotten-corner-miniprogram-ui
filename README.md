# 遗忘角落探险家小程序

![WeChat Mini Program](https://img.shields.io/badge/WeChat-MiniProgram-07C160)
![Status](https://img.shields.io/badge/Status-Demo-orange)
![License](https://img.shields.io/badge/License-MIT-blue)

一个面向校园失物招领场景的微信小程序前端演示项目，围绕“发布线索、查看详情、消息通知、个人记录”搭建了完整的交互闭环。项目适合用于课程作业、作品集展示、微信小程序练手，以及后续接入后端继续扩展。

项目开发过程中结合了 AI 辅助进行页面原型、交互逻辑和文案整理，最终由作者完成功能整合、样式调整、仓库整理与运行验证。

## 项目亮点

- 使用微信小程序原生技术栈完成多页面应用结构与页面跳转。
- 以 `wx.setStorageSync` 模拟本地数据层，打通发布、查询、消息、完成状态等演示流程。
- 支持寻物/招领双模式发布、分类筛选、关键词搜索、图片选择与预览。
- 提供消息中心、未读状态、个人统计、最近发布记录等完整演示体验。
- 已整理为适合公开展示的 GitHub 仓库结构，包含 `README`、`LICENSE`、`.gitignore` 等基础文件。

## 功能概览

- 首页：线索流展示、快捷筛选、分类筛选、关键词搜索、动态统计、图片缩略图。
- 发布：寻物/招领切换、表单校验、发布身份、分类选择、最多 3 张图片选择/预览/删除。
- 详情：物品详情、图片预览、认领核验、联系对方、标记完成、防重复更新。
- 消息：系统通知、联系请求、未读数量、单条已读、全部已读、清空本地消息。
- 我的：学生认证信息、守护积分、发布记录、进行中/完成统计、最近发布、重置演示数据。

## 技术栈

- `WXML`
- `WXSS`
- `JavaScript`
- `微信小程序原生 API`
- `wx.setStorageSync` 本地缓存

## 项目结构

```text
forgotten-corner-miniprogram-ui/
├─ app.js
├─ app.json
├─ app.wxss
├─ project.config.json
├─ sitemap.json
└─ pages/
   ├─ home/
   ├─ detail/
   ├─ publish/
   ├─ messages/
   └─ profile/
```

## 运行方式

1. 打开微信开发者工具。
2. 选择“小程序”并导入当前项目目录。
3. `project.config.json` 当前使用 `touristappid`，适合演示导入。
4. 如果需要真机调试或正式开发，替换为你自己的小程序 AppID。
5. 点击“编译”即可运行。

## 数据说明

当前版本是前端演示项目，没有接入真实后端。项目通过 `wx.setStorageSync` 和 `wx.getStorageSync` 管理本地数据，因此在开发者工具中可以直接体验发布、筛选、消息提醒和状态更新等流程。

## 适合展示的方向

- 微信小程序课程作业
- 校园类项目作品集
- 前端交互原型展示
- AI 辅助开发项目案例

## 后续可扩展方向

- 接入云开发或独立后端服务
- 增加登录、手机号授权、管理员审核
- 接入图片上传、消息订阅、身份认证
- 完善隐私协议与真实业务流程

## License

本项目使用 [MIT License](./LICENSE)。
