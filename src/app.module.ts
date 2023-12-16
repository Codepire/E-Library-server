import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt/dist';
import { DatabaseModule } from './database/database.module';
import { ConfigsService } from './config/configs.service';
import { ConfigsModule } from './config/configs.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        JwtModule.register({
            global: true,
        }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigsService],
            imports: [ConfigsModule],
            useFactory: async (configsService: ConfigsService) => {
                const databaseConfig = configsService.databaseConfig;
                return {
                    type: 'postgres',
                    ...databaseConfig,
                };
            },
        }),
        BooksModule,
        DatabaseModule,
        AuthModule,
    ],
})
export class AppModule {}
