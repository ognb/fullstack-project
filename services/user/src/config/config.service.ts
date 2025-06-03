import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  get port(): number {
    return parseInt(process.env.PORT || '4002', 10);
  }

  get nodeEnv(): string {
    return process.env.NODE_ENV || 'development';
  }

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }

  get isProduction(): boolean {
    return this.nodeEnv === 'production';
  }

  // Service information
  get serviceInfo() {
    return {
      name: process.env.SERVICE_NAME || 'users',
      url: process.env.SERVICE_URL || `http://localhost:${this.port}/graphql`,
      version: '1.0.0',
    };
  }

  // Database URL (used by Prisma)
  get databaseUrl(): string {
    return process.env.DATABASE_URL || 'file:./users.db';
  }
}
