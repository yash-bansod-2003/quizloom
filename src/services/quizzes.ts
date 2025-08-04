import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Quiz } from "@/types";

export const quizzesApi = createApi({
  reducerPath: "quizzesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["Quiz"],

  endpoints: (builder) => ({
    getQuizzes: builder.query<Quiz[], void>({
      query: () => `/api/quizzes`,
      providesTags: ["Quiz"],
    }),
    getQuizById: builder.query<Quiz, string>({
      query: (id) => `/api/quizzes/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Quiz", id }],
    }),
    createQuiz: builder.mutation<Quiz, Partial<Quiz>>({
      query: (quiz) => ({
        url: `/api/quizzes`,
        method: "POST",
        body: quiz,
      }),
      invalidatesTags: ["Quiz"],
    }),
    updateQuiz: builder.mutation<Quiz, Partial<Quiz> & { id: string }>({
      query: ({ id, ...quiz }) => ({
        url: `/api/quizzes/${id}`,
        method: "PUT",
        body: quiz,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: "Quiz", id }],
    }),
    deleteQuiz: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/quizzes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [{ type: "Quiz", id }],
    }),
  }),
});

export const {
  useGetQuizzesQuery,
  useGetQuizByIdQuery,
  useCreateQuizMutation,
  useDeleteQuizMutation,
} = quizzesApi;
