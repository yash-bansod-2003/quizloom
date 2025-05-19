interface ErrorDetail {
      message: string;
      path: string;
}

export interface ErrorResponse {
      name: string;
      code: number;
      errors: ErrorDetail[];
}
