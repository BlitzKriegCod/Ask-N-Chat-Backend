export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    connection: process.env.CONNECTION_STRING,
  },
  secret: process.env.SECRETKEY,
});
