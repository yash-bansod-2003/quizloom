interface ErrorDetail {
      message: string;
      path: string;
}

export interface ErrorResponse {
      name: string;
      code: number;
      errors: ErrorDetail[];
}

export interface User {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      createdAt: string;
      updatedAt: string;
}