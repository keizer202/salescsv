import { Module } from '@nestjs/common';
import { CsvModule } from '@jynnantonnyx/nest-csv-parser';
import { CsvController } from './csv.controller';
import { CsvService } from './csv.service';
import { MomentModule } from '@ccmos/nestjs-moment';

@Module({
  imports: [CsvModule, MomentModule],
  controllers: [CsvController],
  providers: [CsvService],
})
export class CsvDataModule {}
