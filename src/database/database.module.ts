import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { ConfigsModule } from 'src/config/configs.module';

@Module({
  imports: [ConfigsModule],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
