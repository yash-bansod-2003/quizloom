export class CreateQuestionDto {
  text: string;
  type: string;
  quizId: number;
}

export class UpdateQuestionDto {
  text: string;
  type: string;
  quizId: number;
}
