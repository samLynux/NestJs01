import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true,
      transform:true,
      forbidNonWhitelisted:true,
      transformOptions: {
        enableImplicitConversion:true,
      }
    }
  ));
  
  //app.useGlobalInterceptors(new WrapResponseInterceptor(), new TimeoutInterceptor);

  const options = new DocumentBuilder()
    .setTitle('coffeeApp').setDescription('Coffee Aplication').setVersion('1.0').build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
