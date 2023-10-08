import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
import { initialUploadsConfig } from 'src';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  initialUploadsConfig();
  app.useStaticAssets(path.join(__dirname, '../uploads/'));
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(process.env.APP_PORT);
}
bootstrap();
