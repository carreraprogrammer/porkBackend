export interface SubmissionResponse {
  questionId: string;
  value: unknown;
}

export class CreateSubmissionDto {
  formTypeId?: number;
  formTypeKey?: string;
  responses: SubmissionResponse[];
}
