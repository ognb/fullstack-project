import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '../config/config.service';

@Controller('health')
export class HealthController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  checkHealth() {
    return {
      status: 'healthy',
      service: this.configService.serviceInfo.name,
      version: this.configService.serviceInfo.version,
      timestamp: new Date(),
      uptime: process.uptime(),
      environment: this.configService.nodeEnv,
      database: {
        type: 'sqlite',
        connected: true,
      },
    };
  }

  @Get('ready')
  checkReadiness() {
    return { status: 'ready' };
  }

  @Get('live')
  checkLiveness() {
    return { status: 'alive' };
  }
}
