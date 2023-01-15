import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class CreateTag {
  @Length(2, 100)
  @IsString()
  @ApiProperty()
  name!: string;

  @Length(2)
  @IsString()
  @IsOptional()
  lang?: string;
}

export class EditTag extends PartialType(CreateTag) {}
