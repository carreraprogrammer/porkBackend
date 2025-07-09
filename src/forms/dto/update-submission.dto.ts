export interface SubmissionResponseUpdate {
  id?: string;
  questionId?: string;
  value?: unknown;
}

export class UpdateSubmissionDto {
  responses?: SubmissionResponseUpdate[];
}
