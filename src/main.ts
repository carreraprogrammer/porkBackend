import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  console.log('🔥 Iniciando aplicación NestJS...');
  console.log('🌍 DATABASE_URL:', process.env.DATABASE_URL ?? '❌ No definida');
  console.log('✅ Variables de entorno disponibles:', Object.keys(process.env).join(', '));

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
