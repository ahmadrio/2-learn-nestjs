import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('2 - Learn NestJS')
    .setDescription(
      'Belajar API backend dengan NestJS dan sequelize untuk koneksi ke database. Sudah di sertakan untuk pembuatan migration dan seeder.',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/v1', app, document);

  await app.listen(3000);
}
bootstrap();
