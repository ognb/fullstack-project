// services/user/src/config/config.service.ts
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

  // Database configuration
  get database() {
    return {
      type: (process.env.DB_TYPE as any) || 'sqlite',
      database: process.env.DB_DATABASE || 'users.db',
      synchronize: process.env.DB_SYNCHRONIZE === 'true',
      logging: process.env.DB_LOGGING === 'true',
    };
  }

  // Service information
  get serviceInfo() {
    return {
      name: process.env.SERVICE_NAME || 'users',
      url: process.env.SERVICE_URL || `http://localhost:${this.port}/graphql`,
      version: '1.0.0',
    };
  }
}
