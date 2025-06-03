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
        type: this.configService.database.type,
        connected: true, // TODO: Add actual database health check
      },
    };
  }

  @Get('ready')
  checkReadiness() {
    // TODO: Check database connection, dependencies, etc.
    return {
      status: 'ready',
      checks: {
        database: 'connected',
        service: 'initialized',
      },
    };
  }

  @Get('live')
  checkLiveness() {
    return {
      status: 'alive',
      timestamp: new Date(),
    };
  }
}
