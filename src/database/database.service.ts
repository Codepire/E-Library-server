import { Injectable } from '@nestjs/common';
import { ConfigsService } from 'src/config/configs.service';
import { DataSource, DataSourceOptions } from 'typeorm';

@Injectable()
export class DatabaseService {
    constructor(private configsService: ConfigsService) {}

    dataSource(): DataSourceOptions {
        const databaseOptions = this.configsService.databaseConfig;
        return {
            type: 'postgres',
            ...databaseOptions,
        };
    }
}

const dataSourceOptions: DatabaseService = new DatabaseService(
    new ConfigsService(),
);

export default new DataSource(dataSourceOptions.dataSource());
