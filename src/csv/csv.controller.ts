import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CsvService } from './csv.service';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';
import '../middleware/file.filter';
import { csvFileFilter } from '../middleware/file.filter';
import { CsvData } from './csv.model';

@Controller('sales')
export class CsvController {
  private csvdata: CsvData[] = [];
  constructor(private readonly csvService: CsvService) {}

  @Post('record')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './csv',
        filename: (req: any, file: any, cb: any) => {
          cb(null, `${uuid()}${extname(file.originalname)}`);
        },
      }),
      fileFilter: csvFileFilter,
    }),
  )
  uploadSingle(@UploadedFile() file) {
    if (!file) {
      throw new BadRequestException('Invalid file');
    }
    const contentData = this.csvService.parse(file.filename);
    if (!contentData) {
      throw new InternalServerErrorException('Internal Server Error');
    }
    return { message: 'Record successfully uploaded.' };
  }

  @Get('report')
  getAllRecord(
    @Body('date_from') dateFrom: string,
    @Body('date_to') dateTo: string,
  ) {
    return this.csvService.getRecords(dateFrom, dateTo);
  }
}
