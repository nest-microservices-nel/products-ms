import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config';
import {
  MicroserviceOptions,
  RpcException,
  Transport,
} from '@nestjs/microservices';

async function bootstrap() {
  const logger = new Logger('Products-ms');

  // Para establecer la api como un microservicio se hace el siguiente paso:
  // Este es uno de los modos de conexion entre microservicios utilizando TCP, se cambian las opciones pero la estructura es la misma

  // https://docs.nestjs.com/microservices/basics
  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(
  //   AppModule,
  //   {
  //     transport: Transport.TCP,
  //     options: {
  //       port: envs.port,
  //     },
  //   },
  // );

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.NATS,
      options: {
        servers: envs.natsServers,
      },
    },
  );

  // const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        const messages = errors.map(
          (err) =>
            `${err.property} has wrong value ${err.value}, ${Object.values(err.constraints).join(', ')}`,
        );
        return new RpcException(messages);
      },
    }),
  );

  // app.setGlobalPrefix('api');

  await app.listen();

  logger.log(`Products micro service running on port ${envs.port}`);
}
bootstrap();
