import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateMeal, EditMeal } from './meals.dto';
import { MealsService } from './meals.service';

@ApiTags('Meals')
@Controller('meals')
export class MealsController {
  constructor(private mealsService: MealsService) {}

  @Get()
  async getMany() {
    return await this.mealsService.getMany();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.mealsService.getOne(id);
  }

  @Post()
  createOne(@Body() dto: CreateMeal) {
    return this.mealsService.createOne(dto);
  }

  @Put(':id')
  editOne(@Param('id') id: number, @Body() dto: EditMeal) {
    return this.mealsService.editOne(id, dto);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: number) {
    return this.mealsService.deleteOne(id);
  }

  @Get('find/:find')
  async find(@Param('find') find: string) {
    const search = find.split(/[,\s]+/);
    return await this.mealsService.find(search);
  }
}
