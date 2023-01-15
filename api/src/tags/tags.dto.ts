import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateTag {
  @Length(2, 100)
  @IsString()
  @ApiProperty()
  name!: string;

  @Length(0, 2)
  @IsString()
  lang?: string;
}

export class EditTag extends PartialType(CreateTag) {}
