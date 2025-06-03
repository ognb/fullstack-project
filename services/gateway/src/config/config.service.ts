import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  get port(): number {
    return parseInt(process.env.PORT || '4000', 10);
  }

  get nodeEnv(): string {
    return process.env.NODE_ENV || 'development';
  }

  get isDevelopment(): boolean {
    return this.nodeEnv === 'development';
  }
}
