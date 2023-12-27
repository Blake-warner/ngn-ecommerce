import * as CONSTANTS from './app/shared/constants';

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix(CONSTANTS.globalPrefix);
  const port = process.env.PORT || CONSTANTS.port;
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${CONSTANTS.globalPrefix}`
  );
}

bootstrap();
