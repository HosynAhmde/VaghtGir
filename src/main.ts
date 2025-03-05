import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ConfigNamespace } from '@Common/configuration/config.constant';
import { swaggerConfig } from '@Common/modules/swagger';
import { getNodeEnv } from '@Common/utils';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.enableVersioning();
  const configService = app.get(ConfigService);
  const { port, host, tz } = configService.get(ConfigNamespace.Application);

  swaggerConfig(app);

  const nodeEnv = getNodeEnv('development');

  await app.listen(port, host);
  const logger = new Logger();

  logger.log(`App Environment is ${nodeEnv!}`, 'NestApplication');
  logger.log(`App Timezone is ${tz as string}`, 'NestApplication');
  logger.log(`🚀 Server running on ${await app.getUrl()}`, 'NestApplication');
}
bootstrap();
