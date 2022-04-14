module.exports = {
  'development': {
    'username': process.env.SEQUELIZE_USER,
    'password': process.env.SEQUELIZE_PASSWORD,
    'database': 'friendless',
    'dialect': 'mysql',
    'host': process.env.SEQUELIZE_HOST,
    'port': 3306
  },
  'test': {
    'username': process.env.TU,
    'password': process.env.TP || null,
    'database': 'friendless',
    'host': 'localhost',
    'port': 3306,
    'dialect': 'mysql',
    'logging': false
  },
  'production': {
    'use_env_variable': 'JAWSDB_URL',
    'dialect': 'mysql'
  }
};