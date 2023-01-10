import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MealsController } from './meals.controller';
import { Meal } from './meals.entity';
import { MealsService } from './meals.service';

@Module({
  imports: [TypeOrmModule.forFeature([Meal])],
  controllers: [MealsController],
  providers: [MealsService],
})
export class MealsModule {}
