import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
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
    dto.tags = dto.tags.filter((tag) => tag.length > 2);

    const meal = await this.meal.create(dto);
    const data = await this.meal.save(meal);
    if (!data) throw new InternalServerErrorException();

    return { data };
  }

  async editOne(id: number, dto: EditMeal) {
    if (dto.tags) dto.tags = dto.tags.filter((tag) => tag.length > 2);

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

  async find(search: string[]) {
    const words = search.filter((word) => word.length > 2);
    const data = await this.meal.find({
      where: [
        {
          tags: Raw((alias) =>
            words
              .map((word) => `FIND_IN_SET('${word}', ${alias})`)
              .join(' AND '),
          ),
        },
      ],
    });
    return { data };
  }
}
