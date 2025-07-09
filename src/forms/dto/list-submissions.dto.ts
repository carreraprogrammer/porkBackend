// src/forms/dto/ListSubmissionsDto.ts
import { IsOptional, IsInt, IsString } from 'class-validator';

export class ListSubmissionsDto {
  @IsOptional() @IsInt()    formTypeId?: number;
  @IsOptional() @IsString() formTypeKey?: string;
}
