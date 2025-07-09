import { IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { SubmissionResponseDto } from './create-submission.dto';

export class UpdateSubmissionDto {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubmissionResponseDto)
  responses?: SubmissionResponseDto[];
}