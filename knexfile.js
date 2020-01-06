const config = require('config');

module.exports = {
  client: 'sqlite3',
  connection: { filename: config.get('dbPath') },
  migrations: { tableName: 'migrations' },
  useNullAsDefault: true,
};
