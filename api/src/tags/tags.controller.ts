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
import { CreateTag, EditTag } from './tags.dto';
import { TagsService } from './tags.service';

@ApiTags('Tags')
@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsService) {}

  @Get()
  async getMany() {
    return await this.tagsService.getMany();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.tagsService.getOne(id);
  }

  @Post()
  createOne(@Body() dto: CreateTag) {
    return this.tagsService.createOne(dto);
  }

  @Put(':id')
  editOne(@Param('id') id: number, @Body() dto: EditTag) {
    return this.tagsService.editOne(id, dto);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: number) {
    return this.tagsService.deleteOne(id);
  }
}
