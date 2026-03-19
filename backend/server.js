const app = require('./src/app');
const PORT = process.env.PORT || 3055;
const database = require('./src/dbs/init.mongodb');

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on('SIGINT', async () => {
  console.log('\nShutting down server...');

  server.close(async () => {
    await database.disconnect();
    console.log('Server closed');
    process.exit(0);
  });

  // Force exit after 10 seconds if graceful shutdown fails
  setTimeout(() => {
    console.error('Forced shutdown after timeout');
    process.exit(1);
  }, 10000);
});