# Simple Memo Application
## Used
- Koa + Apollo Server for Web Serving and XHR Requests
- Babel for transpile the client code
- Webpack
- SQLite3 with TypeORM
- TS for static type check


## How to run
Make sure you already installed Node.js and SQLite3.

First, install the dependencies.

```bash
$ npm install
```

Next, run the Koa server.

```bash
$ npm start
```

Finally, run Webpack Dev Server.

```bash
$ npm start:client
```

Note that not production build command added yet.


## Why did you switched Sequelize to TypeORM?
It's just my mistake, I thought that my next project in my company uses Sequelize, however it was TypeORM.

So that's why I changed.

Note that TypeORM uses TypeScript, so I replaced static type checker to TS.

IDK, they are can't be co-exists.