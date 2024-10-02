export class CreateAnswerDto {
  text: string;
  type: string;
  questionId: number;
}

export class UpdateAnswerDto {
  text: string;
  type: string;
  questionId: number;
}
