import { app } from './app';
import { env } from './config/environment';
import { prisma } from './repositories/prisma';

const start = async () => {
  try {
    // Connect to database
    await prisma.$connect();

    // Start server
    const address = await app.listen({
      port: env.PORT,
      host: '0.0.0.0',
    });

    app.log.info(`Server listening at ${address}`);
    app.log.info(`Environment: ${env.NODE_ENV}`);
  } catch (error) {
    app.log.error(error);
    await prisma.$disconnect();
    process.exit(1);
  }
};

start();