import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function initSwagger(path: string, app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Food API')
    .setDescription('Esta es una API para sugerencias de comidas.')
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(path, app, document);
}
