import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Quiz } from "@/types";

export const quizzesApi = createApi({
  reducerPath: "quizzesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["Quiz", "Question", "Answer", "Settings", "Results"],

  endpoints: (builder) => ({
    getQuizzes: builder.query<Quiz[], void>({
      query: () => `/api/quizzes`,
      providesTags: ["Quiz"],
    }),
  }),
});

export const { useGetQuizzesQuery } = quizzesApi;
