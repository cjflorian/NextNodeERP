const { Pool } = require('pg');

const pool = new Pool({
  host: 'myrds.cskvnw0afgde.us-east-1.rds.amazonaws.com',
  port: 5432,
  database: 'DbErp',
  user: 'cjfn',
  password: 'cjfn01',
});

module.exports = pool;