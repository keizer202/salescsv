import { Injectable, NotFoundException } from '@nestjs/common';
import { CsvParser, ParsedData } from '@jynnantonnyx/nest-csv-parser';
import { createReadStream, unlinkSync } from 'fs';
import { CsvData } from './csv.model';
import { txtCamel } from '../middleware/text.formatter';

class Entity {
  foo: string;
  bar: string;
}

@Injectable()
export class CsvService {
  private csvData: CsvData[] = [];
  constructor(private readonly csvParser: CsvParser) {}

  async parse(fileName: string) {
    const fileLocation = process.cwd() + '/csv/' + fileName;
    const stream = createReadStream(fileLocation);
    const data: ParsedData<Entity> = await this.csvParser.parse(stream, Entity);
    const entities: Entity[] = data.list;
    entities.map((data) => {
      for (const x in data) {
        const value = data[x].split(',');
        const indexes = x.split(',');
        const result = Object.assign.apply(
          {},
          indexes.map((v, i) => ({ [txtCamel(v)]: value[i] })),
        );
        this.csvData.push(result);
      }
    });
    try {
      unlinkSync(fileLocation);
    } catch (err) {
      return err;
    }

    return this.csvData;
  }

  getRecords(dateFrom: string, dateTo: string) {
    let csvFiltered = [];
    if (dateFrom && dateTo) {
      csvFiltered = this.csvData.filter((data) => {
        if (
          parseInt(data.lastPurchaseDate.replace(/-/g, '')) >=
            parseInt(dateFrom.replace(/-/g, '')) &&
          parseInt(data.lastPurchaseDate.replace(/-/g, '')) <=
            parseInt(dateTo.replace(/-/g, ''))
        ) {
          return data;
        }
      });
    } else {
      csvFiltered = [...this.csvData];
    }

    if (csvFiltered.length === 0) {
      throw new NotFoundException('No record found');
    }
    return csvFiltered;
  }
}
