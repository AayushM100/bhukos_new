import { app } from './app';
import { env } from './config/environment';
import { prisma } from './repositories/prisma';
import { syncTodaysFact } from './modules/facts/service';
import cron from 'node-cron';

const start = async () => {
  try {
    // Connect to database
    await prisma.$connect();

    // Initialize facts on startup - check if today's fact exists, sync if missing
    await syncTodaysFact();
    app.log.info('Daily fun fact initialized');

    // Schedule daily Wikipedia sync at 00:05 UTC
    cron.schedule('5 0 * * *', async () => {
      try {
        await syncTodaysFact();
        app.log.info('Daily Wikipedia fact synced');
      } catch (err) {
        app.log.error({ err }, 'Failed to sync daily Wikipedia fact');
      }
    }, {
      timezone: 'UTC',
    });

    // Start server
    const address = await app.listen({
      port: env.PORT,
      host: '0.0.0.0',
    });

    app.log.info(`Server listening at ${address}`);
    app.log.info(`Environment: ${env.NODE_ENV}`);
  } catch (err) {
    app.log.error({ err }, 'Failed to start server');
    await prisma.$disconnect();
    process.exit(1);
  }
};

start();