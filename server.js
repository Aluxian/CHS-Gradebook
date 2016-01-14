var mongo = require('mongodb-uri').parse(process.env.MONGOHQ_URL);
require('deployd')({
  port: process.env.PORT,
  env: process.env.NODE_ENV,
  db: {
    port: mongo.hosts[0].port,
    host: mongo.hosts[0].host,
    name: mongo.database,
    credentials: {
      username: mongo.username,
      password: mongo.password
    }
  }
}).listen();
