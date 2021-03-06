---
group: middleware
name: dn-middleware-storybook
title: storybook 中间件
---

## dn-middleware-storybook

dn-middleware-storybook 用于启动或打包 [storybook](https://storybook.js.org/)，可以在应用之外快速调试组件。

注意：在启动 storybook 服务时，dn-middleware-storybook 将使用 watch 模式的 webpack 编译代码，常期占用线程，后续中间件提前在 webpack 运行前执行。


| 选项 | 意义 | 默认值 |
| ------ | ------ | ------ |
| type | 项目类型，如 'react', 'angular', 'vue'  | 'react' |
| host | 主机  | 'localhost' |
| port | 端口  | '6002' |
| config | 配置文件目录名  | '.storybook' |
| assets | 静态资源路径  | './assets' |
| output | 打包目录名  | '.docs' |

备注：调试类库时，可在 webpack 中间件后使用 storybook，各故事板中加载的调试组件也源自打包文件，这样可以避免 storybook 服务和本地 webpack 配置策略的不同。