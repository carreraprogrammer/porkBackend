export interface SubmissionResponse {
  questionId: string;
  response: unknown;
}

export class CreateSubmissionDto {
  formTypeId?: number;
  formTypeKey?: string;
  metadata?: unknown;
  responses: SubmissionResponse[];
}
