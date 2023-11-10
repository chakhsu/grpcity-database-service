```
# 数据库微服务

[English](./README.md) | [简体中文](./README_CN.md)

该项目提供了一个完整的，生产就绪的数据库微服务。基于 `gRPCity` 和 `sequelize` 打造的数据库 gRPC 微服务，提供完整的数据 CRUD 的能力，为 BFF 层赋能。
同时**代码生成**是本项目一个亮点，支持`model`、 `proto`、 `handler` 和 `test` 三处位置的代码生成，也就是项目能根据`table sql`分步进行代码生成，实现了一个通用的数据库微服务的能力。

数据库的读写独立成微服务是很常见的业务架构优化的措施。原因如下：

- **独立性**：可以针对性做监控、优化和安全；
- **易用性**：换数据库或做成读写分离更容易；
- **一致性**：数据处理集中，保证数据质量；

如果各微服务都集成数据库，尤其是都使用同一个数据库进行集成的情况下，会带来数据管理上的混乱，容易发生 conflict，降低效率和安全性。

## 你能学到什么?

如果你想使用`gRPCity`库作为线上生产使用，那么本项目是非常推荐你去阅读和学习的，因为：

- 你能学到一个完整的 gRPC 数据库微服务的代码结构；
- 你能学到详尽的 `gRPCity` 库的 server 用法；
- 你能学到 `sequelize` 的用法；
- 你能学到如何利用代码生成的方式，方便我们快速接入数据库微服务；
- 你能学到通用 CRUD RPC 接口的是如何设计的；
- 你能学到复杂查询如何设计；

## 项目指南

### 特色功能

- 尽善尽美的 proto 目录结构和组织；
- 齐全的 CRUD RPC，支持逻辑删除，避免误删导致数据丢失；
- 只需要维护好`table sql`，使用代码生成的方式即可维护接口；
- filter message 查询设计，提供了与或逻辑，模糊查询等查询功能；
- 所有 RPC 接口都支持 e2e 测试；

### 目录安排

目录 | 功能
--- | ---
bin | 应用入口
src | 主要代码
test | 测试代码
pm2 | pm2 执行代码
protos | proto 代码

目录 | 功能 | 例子
--- | --- | ---
src/app.js | 主程序入口 | 模块初始化和服务启动
src/config | 配置文件 | development.js
src/lib | 底层组件 | logger.js
src/model | 数据模型 | User.js
src/handler | gRPC 处理器 | userHandler.js
src/middleware | server 中间件 | rpcLog.js
src/util | 无状态工具库 | time.js

### 依赖汇总

1. 使用 standard.js 作为编码格式规范；
3. 使用 Nodemon 开发，使用 PM2 用于生产运行；
4. 使用 pnpm 作为包管理器；
5. 使用 Node.js 原生 ESM 作为模块管理；
6. 使用 pino 作为日志工具；
7. 使用 ava 作为测试工具；
8. 使用 sequelize 作为 MySQL 数据库 ORM 驱动；
9. 使用 grpcity 作为 grpc 微服务框架；

## 运行

### 配置数据库

有两处地方的数据库需要配置，分别是`src/config` 和 `tools/mysql.config.js`，需要写入你的可用数据库信息，目前只支持 MySQL。请自行修改。

修改完数据库配置后，执行下面命令，创建数据表：

```sh
pnpm gen-table
```

### 安装依赖

```sh
pnpm i
```

### 启动服务

```sh
pnpm dev
```

### e2e 测试

启动之后，需要跑一次 e2e 测试，如果测试没有报错，同时也能在数据库看到有遗留的测试数据，就说明项目全部跑通。

```sh
pnpm test
```

## 代码生成

本项目支持根据 `table sql` 的内容进行代码生成，减轻开发负担。适合项目新启动或新数据表创建的场景。

`table sql` 的存放目录在 `tools/sql`，相关代码生成脚本存放在`tools`。

### 生成 model

执行下面命令，你将会在 `src/model` 目录里看到更新后的代码。
```sh
pnpm gen-model
```

### 生成 proto

执行下面命令，你将会在 `protos` 目录里看到更新后的代码。
```sh
pnpm gen-proto
```

### 生成 handler

执行下面命令，你将会在 `src/handler` 目录里看到更新后的代码。
```sh
pnpm gen-handler
```

### 生成 test

执行下面命令，你将会在 `test` 目录里看到更新后的代码。
```sh
pnpm gen-test
```

### 代码格式化

跑完所有代码生成之后，我们还要执行一次代码格式化。

```sh
pnpm fix
```

---

更多细节请自行阅读代码进行学习和发现，实践是最好的方式，强烈建议下载本项目到本地进行更多的试用。
```

## License

Released under the MIT License.