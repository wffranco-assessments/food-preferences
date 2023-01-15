import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTag, EditTag } from './tags.dto';
import { Tag } from './tags.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private tag: Repository<Tag>,
  ) {}

  async getMany() {
    const data = await this.tag.find();
    return { data };
  }

  async getOne(id: number) {
    const data = await this.tag.findOneBy({ id });
    if (!data) throw new NotFoundException();

    return { data };
  }

  async createOne(dto: CreateTag) {
    const meal = await this.tag.create(dto);
    const data = await this.tag.save(meal);

    return { data };
  }

  async editOne(id: number, dto: EditTag) {
    const meal = await this.tag.findOneBy({ id });
    if (!meal) throw new NotFoundException();

    Object.assign(meal, dto);
    const data = await this.tag.save(meal);

    return { data };
  }

  async deleteOne(id: number) {
    const data = await this.tag.delete(id);
    if (!data?.affected) throw new NotFoundException();

    return { data };
  }
}
