import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { IsArray, IsString, Length } from 'class-validator';

export class CreateMeal {
  @Length(2, 255)
  @IsString()
  @ApiProperty()
  name!: string;

  @Length(2, 50)
  @IsString()
  @ApiProperty()
  slug!: string;

  @IsArray()
  @IsString({ each: true })
  @ApiProperty()
  tags?: string[];
}

export class EditMeal extends PartialType(
  OmitType(CreateMeal, ['slug'] as const),
) {}
