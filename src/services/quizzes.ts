import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Quiz } from "@/types/index.ts";

export const quizzesApi = createApi({
  reducerPath: "quizzesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_BASE_URL,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getQuizzes: builder.query<Quiz[], void>({
      query: () => `/api/quizzes`,
    }),
    getQuizById: builder.query<Quiz, string>({
      query: (id) => `/api/quizzes/${id}`,
    }),
  }),
});

export const { useGetQuizzesQuery, useGetQuizByIdQuery } = quizzesApi;
