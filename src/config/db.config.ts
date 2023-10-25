export default {
  type: process.env.DB_TYPE || 'mongodb',  // or 'postgresql'
  mongodb: {
    connectionString: process.env.MONGODB_CONNECTION_STRING || 'mongodb://localhost:27017/mydb',
  },
  postgresql: {
    connectionString: process.env.POSTGRESQL_CONNECTION_STRING || 'postgresql://user:password@localhost:5432/mydb',
  },
};

