import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import { initialUploadsConfig } from 'src';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());

    initialUploadsConfig();
    app.useStaticAssets(path.join(__dirname, '../uploads/'));

    const swaggerConfig = new DocumentBuilder()
        .setTitle('SOU E Library')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, document);

    await app.listen(process.env.APP_PORT);
}
bootstrap();
