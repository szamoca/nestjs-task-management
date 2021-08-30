import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  if (process.env.NODE_ENV === 'development') {
    logger.log('Enabling cors');
    app.enableCors();
  }

  const serverConfig = config.get('server');
  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);
  logger.log(`Application started on port ${port}`)
}
bootstrap();