// src/forms/dto/UpdateQuestionDefinitionDto.ts
import { IsString, IsIn, IsOptional, IsArray } from 'class-validator';

export class UpdateQuestionDefinitionDto {
  @IsOptional()
  @IsString()
  label?: string;

  @IsOptional()
  @IsString()
  @IsIn(['text','radio','textarea','number'])
  fieldType?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  options?: string[];
}
