import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    console.log('🗄️ Connected to SQLite database via Prisma');
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
