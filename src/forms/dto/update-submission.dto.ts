export interface SubmissionResponseUpdate {
  id?: string;
  questionId?: string;
  response?: unknown;
}

export class UpdateSubmissionDto {
  responses?: SubmissionResponseUpdate[];
}
