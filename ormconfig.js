const path = require('path');
const folder = process.env.NODE_ENV == 'production' ? 'dist' : 'src';

module.exports = {
   "type": "postgres",
   "host": process.env.TYPEORM_HOST,
   "port": process.env.TYPEORM_PORT,
   "username": process.env.TYPEORM_USERNAME,
   "password": process.env.TYPEORM_PASSWORD,
   "database": process.env.TYPEORM_DATABASE,
   "synchronize": true,
   "logging": false,
   entities: [path.join(__dirname, `${folder}/**/*.entity.{js,ts}`)],
   migrations: [path.join(__dirname, `${folder}/**/*.migration.{js,ts}`)],
   subscribers: [path.join(__dirname, `${folder}/**/*.subscriber.{js,ts}`)],
   "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   }
}