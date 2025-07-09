// src/form-types/dto/create-form-type.dto.ts
import { IsString } from 'class-validator';

export class CreateFormTypeDto {
  @IsString()
  key!: string;

  @IsString()
  label!: string;
}
