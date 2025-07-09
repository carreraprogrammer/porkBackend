// src/forms/dto/create-question-definition.dto.ts
import { IsString, IsIn, IsOptional, IsArray } from 'class-validator';

export class CreateQuestionDefinitionDto {
  @IsString()
  questionId!: string;

  @IsString()
  label!: string;

  @IsString()
  @IsIn(['text','radio','textarea','number'])
  fieldType!: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  options?: string[];
}
