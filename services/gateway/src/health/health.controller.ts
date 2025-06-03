import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  checkHealth() {
    return {
      status: 'healthy',
      timestamp: new Date(),
      uptime: process.uptime(),
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development',
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
