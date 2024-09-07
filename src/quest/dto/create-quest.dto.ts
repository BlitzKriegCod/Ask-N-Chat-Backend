import {
  IsNotEmpty,
  IsString,
  IsArray,
  IsMongoId,
  IsOptional,
} from 'class-validator';

export class CreateQuestDto {
  @IsMongoId({ message: 'Id must be a mongoId ' })
  Author: string;
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsNotEmpty()
  @IsString()
  description: string;
  @IsNotEmpty()
  @IsString()
  expected: string;
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  Tags?: string[];
}
