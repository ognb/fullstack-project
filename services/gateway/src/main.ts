// services/gateway/src/main.ts
import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Optimized CORS configuration
  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,

    // ⚡ CACHE PREFLIGHT RESPONSES FOR 24 HOURS
    maxAge: 86400, // 24 hours in seconds

    // Specify exactly what's allowed (reduces preflight complexity)
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Apollo-Require-Preflight', // Apollo-specific header
      'X-Requested-With',
    ],

    // Expose headers your frontend might need
    exposedHeaders: ['X-Total-Count'],

    // ⚡ PRELIGHT CACHING: Browser won't send OPTIONS for 24 hours
    optionsSuccessStatus: 204,
  });

  const port = process.env.PORT || 4000;
  await app.listen(port);

  console.log(`🚀 Gateway running on: http://localhost:${port}`);
  console.log(`🏥 Health check: http://localhost:${port}/health`);
  console.log(`⚡ CORS preflight caching: 24 hours`);
}

bootstrap();
