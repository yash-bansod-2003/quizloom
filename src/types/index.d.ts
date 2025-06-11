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
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Session {
  session: {
    id: string;
    expiresAt: string;
    token: string;
    createdAt: string;
    updatedAt: string;
    ipAddress: string;
    userAgent: string;
    userId: string;
  }
  user: User;
}

export interface Quiz { status: string; id: string; title: string; label: string; priority: string; created_at: string; updated_at: string; }

