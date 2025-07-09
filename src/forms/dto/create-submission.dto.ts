// src/forms/dto/SubmissionResponseDto.ts
import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsOptional, IsInt, IsNotEmptyObject, IsArray, ValidateNested } from 'class-validator';

export class SubmissionResponseDto {
  @IsString()
  @IsNotEmpty()
  questionId!: string;

  @IsNotEmpty()
  response!: any;
}

export class CreateSubmissionDto {
  @IsOptional()
  @IsInt()
  formTypeId?: number;

  @IsOptional()
  @IsString()
  formTypeKey?: string;

  @IsNotEmptyObject()
  metadata!: any;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubmissionResponseDto)
  responses!: SubmissionResponseDto[];
}
