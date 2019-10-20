module.exports = {
  SERVER: { PORT: process.env.PORT || 3000 },
  DB: {
    CONNECTION_LIMIT: 10,
    HOST: process.env.DB_HOST || '127.0.0.1',
    PORT: process.env.DB_PORT || '3306',
    USER: process.env.DB_USER || 'root',
    PASSWORD: process.env.DB_PASSWORD || 'root',
    DATABASE: process.env.DB_DATABASE || 'chatfood',
  },
}
