# Database Service

[English](./README.md) | [简体中文](./README_CN.md)

This project provides a complete and production-ready database microservice. It is built using `gRPCity` and `sequelize`, offering full data CRUD capabilities to empower the BFF layer.
One highlight of this project is the **code generation** feature, which supports code generation in four locations: `model`, `proto`, `handler`, and `test`. In other words, the project can generate code step by step based on the `table sql`, achieving a generic database microservice capability.

Separating the database into a standalone microservice is a common business architecture optimization measure. The reasons for doing so are as follows:

- **Independence**: It allows targeted monitoring, optimization, and security measures.
- **Usability**: Switching databases or implementing read/write separation becomes easier.
- **Consistency**: Data processing is centralized, ensuring data quality.

If each microservice integrates its own database, especially when they all use the same database for integration, it can lead to confusion in data management, conflicts, and a decrease in efficiency and security.

## What will you learn?

If you are interested in using the `gRPCity` library for production purposes, this project is highly recommended for you to read and learn from because:

- You will learn the complete code structure of a gRPC database microservice.
- You will learn the detailed usage of the `gRPCity` library for server implementation.
- You will learn how to use `sequelize`.
- You will learn how to quickly integrate a database microservice using code generation.
- You will learn how the common CRUD RPC interfaces are designed.
- You will learn how to design complex queries.

## Project Guide

### Key Features

- Well-structured and organized `proto` directory.
- Comprehensive CRUD RPCs with support for logical deletion to prevent data loss caused by accidental deletion.
- Easy interface maintenance by only needing to maintain the `table sql` and using code generation.
- Filter message query design with support for logical operators (AND, OR), fuzzy queries, and more.
- All RPC interfaces support end-to-end testing.

### Directory Structure

First-level directory structure：

Directory | Function
--- | ---
bin | Application entry point
src | Main code
test | Test code
pm2 | Execution code for PM2
protos | Proto code

`src` directory structure：

Directory | Function | Example
--- | --- | ---
src/app.js | Main program entry | Module initialization and server startup
src/config | Configuration files | development.js
src/lib | Low-level components | logger.js
src/model | Data models | User.js
src/handler | gRPC handlers | userHandler.js
src/middleware | Server middleware | rpcLog.js
src/util | Stateless utility library | time.js

### Dependency Summary

1. Uses standard.js as the coding style guide.
2. Uses Nodemon for development and PM2 for production runtime.
3. Uses pnpm as the package manager.
4. Uses native Node.js ESM for module management.
5. Uses pino as the logging tool.
6. Uses ava as the testing tool.
7. Uses sequelize as the MySQL database ORM driver.
8. Uses grpcity as the gRPC microservice framework.

## Running

### Configure the Database

There are two places where the database needs to be configured: `src/config` and `tools/mysql.config.js`. You need to provide your own database information. Currently, only MySQL is supported. Please modify accordingly.

After configuring the database, execute the following command to create the database tables:

```sh
pnpm gen-table
```

### Install Dependencies

```sh
pnpm i
```

### Start the Service

```sh
pnpm dev
```

### E2E Test

After starting the service, run the e2e tests. If the tests pass without errors and you can see test data in the database, it means the project is running correctly.

```sh
pnpm test
```

## Code Generation

This project supports code generation based on the content of the `table sql`, reducing development efforts. It is suitable for scenarios where a project is newly started or new data tables are created. You don't need to write the code for  `model`, `proto`, `handler`, and `test`. Simply execute the relevant code generation commands.

The `table sql` files are stored in the `tools/sql` directory, and the code generation scripts are located in the `tools` directory.

### Generate Model

Execute the following command to see the updated code in the `src/model` directory.

```sh
pnpm gen-model
```

### Generate Proto

Execute the following command to see the updated code in the `protos` directory.

```sh
pnpm gen-proto
```

### Generate Handler

Execute the following command to see the updated code in the `src/handler` directory.

```sh
pnpm gen-handler
```

### Generate Test

Execute the following command to see the updated code in the `test` directory.

```sh
pnpm gen-test
```

### Code Format

After running all code generation commands, execute the following command to format the code.

```sh
pnpm fix
```

---

Please read the code yourself for more details and for learning and exploration. Practice is the best way, and I strongly recommend downloading this project locally to try it out more.

## License

Released under the MIT License.
