import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MealsModule } from './meals/meals.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'food-db',
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*entity{.ts,.js}'],
      synchronize: true,
    }),
    MealsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
