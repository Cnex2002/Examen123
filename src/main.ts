import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { envs } from 'config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Main');

  const app = await NestFactory.create(AppModule);

  //PARA QUE FUNCIONE MIS VALIDACIONES
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(envs.port);
  logger.log(`App running on port ${envs.port}`);
}
bootstrap();
