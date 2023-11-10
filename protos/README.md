## Microservice Proto and RPC Definitions and Usage

[English](./README.md) | [简体中文](./README_CN.md)

### Directory Structure

```markdown
└── services
    ├── collection
    │   ├── UserDB.proto
    │   └── RoleDB.proto
    ├── model
    │   ├── User.proto
    │   └── Role.proto
    ├── database-service.proto
```

| Directory            | Description                                                 |
| :------------------- | :---------------------------------------------------------- |
| services/model       | Defines data model entity messages (e.g., Group message)     |
| services/collection  | Provides CRUD RPC proto definitions for data model operations |
| services             | Stores RPC proto definitions for various microservices       |

### Referencing Logic

Message definitions in the "model" directory can be referenced by all microservices' RPCs. The "collection" directory is also an RPC for microservices but needs to be integrated into the "database-service." Therefore, it appears as an additional link, but there is no actual difference.

`model/User.proto` --> `collection/UserDB.proto` --> `service/database-service`

`model/User.proto` --> `service/user-service`

Benefits of this design:
- Clear naming: "model" contains shared message definitions, while "collection" clearly expresses the meaning of the database table collections.
- With a layered service design, the same message is used for message passing between microservices, ensuring efficiency. Additionally, the references are unidirectional, without any loops.

## Naming Guidelines

**Message naming conventions are as follows:**

- Message names use `PascalCase`, i.e., Pascal case with the initial letter capitalized.
- Field names use `pascalCase`, i.e., Pascal case with the initial letter lowercase.

Example:
```proto
message SongServerRequest {
  optional string song_name = 1;
}
```

**RPC naming conventions are as follows:**

- Service names use `PascalCase`.
- RPC names use `PascalCase`.
- RPC methods use `PascalCase`.

Example:
```proto
service HostService {
  rpc Create(CreateRequest) returns (CreateResponse) {}
}
```

**File naming conventions are as follows:**

As shown in the directory structure:

- Service RPC protos use `kebab-case`, i.e., all lowercase with hyphens.
- Collection RPC protos use `PascalCase` + `DB`.
- Model message protos use `PascalCase`.

## Code Style Validation

Use the `clang-format` tool to validate the code style of protos.

Installation steps:

1. macOS
```shell
brew install clang-format
```

2. VSCode
Install the `vscode-proto3` extension.

This way, you can directly use `clang-format` to ensure consistent code formatting.
