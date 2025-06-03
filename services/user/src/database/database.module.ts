import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '../config/config.service';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'sqlite',
        database: configService.database.database,
        entities: [User],
        synchronize: configService.database.synchronize,
        logging: configService.database.logging,
      }),
    }),
  ],
})
export class DatabaseModule {}
