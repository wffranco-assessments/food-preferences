import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMeal, EditMeal } from './meals.dto';
import { Meal } from './meals.entity';

@Injectable()
export class MealsService {
  constructor(
    @InjectRepository(Meal)
    private meal: Repository<Meal>,
  ) {}

  async getMany() {
    const data = await this.meal.find();
    return { data };
  }

  async getOne(id: number) {
    const data = await this.meal.findOneBy({ id });
    if (!data) throw new NotFoundException();

    return { data };
  }

  async createOne(dto: CreateMeal) {
    const meal = await this.meal.create(dto);
    const data = await this.meal.save(meal);

    return { data };
  }

  async editOne(id: number, dto: EditMeal) {
    const meal = await this.meal.findOneBy({ id });
    if (!meal) throw new NotFoundException();

    Object.assign(meal, dto);
    const data = await this.meal.save(meal);

    return { data };
  }

  async deleteOne(id: number) {
    const data = await this.meal.delete(id);
    if (!data?.affected) throw new NotFoundException();

    return { data };
  }
}
