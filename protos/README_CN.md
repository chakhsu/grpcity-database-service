## 微服务 proto 和 rpc 定义及使用

[English](./README.md) | [简体中文](./README_CN.md)

### 目录结构

```
└── services
    ├── collection
    │   ├── UserDB.proto
    │   └── RoleDB.proto
    ├── model
    │   ├── User.proto
    │   └── Role.proto
    ├── database-service.proto
```

|目录|描述|
|:---|:---|
|services/model|数据模型实体 message 定义，例如 Group message |
|services/collection|数据模型的操作实例，给 DB service 提供 CURD RPC proto 定义|
|services|存放各类微服务的 RPC proto 定义|

### 引用逻辑

model 里的 message 定义能被所有微服务 rpc 引用，其中 collection 也是微服务 rpc，但是需要被整合到 database-service 中，所以这里看起来会多一个链块，实际上没有区别.

`model/User.proto` --> `collection/UserDB.proto` --> `service/database-service`

`model/User.proto` -->  `service/user-service`

这样设计的好处：
- 命名清晰，model 是公共的message定义，collection 又能清晰表达数据库表集合的含义
- 服务分层设计后，微服务之间的消息内转是用到了同一个message，保证了效率，同时，引用是单向的，没有回环

## 命名指南

**message 的命名规则如下：**

- message name 使用 `PascalCase`，即首字母大写的帕斯卡命名法
- field name 使用`pascalCase`，即首字母小写的帕斯卡命名法

如下所示：
```
message SongServerRequest {
  optional string song_name = 1;
}
```

**rpc 的命名规则如下**：

- servce name 使用 `PascalCase`
- rpc name 使用 `PascalCase`
- rpc method 使用 `PascalCase`

```
service HostService {
  rpc Create(CreateRequest) returns (CreateResponse) {}
}
```
**文件名命名规则如下：**

如目录所示那样

- service rpc proto 使用`kebab-case`, 即全小写的串行命名法
- collection rpc proto 使用`PascalCase` + `DB`
- model message proto 使用 `PascalCase`

## 代码风格校验

使用 `clang-format` 工具进行 proto 代码风格校验

安装步骤：

1、macOS
```
brew install clang-format
```

2、vscode
安装`vscode-proto3`扩展

这样就可以直接使用 `clang-format` 进行代码格式的统一。
