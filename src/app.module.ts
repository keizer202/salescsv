import { MomentModule } from '@ccmos/nestjs-moment';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CsvDataModule } from './csv/csv.module';

@Module({
  imports: [CsvDataModule, MomentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
