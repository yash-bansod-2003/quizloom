import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Question } from "@/components/dashboard/quizzes/questions/columns";

export const questionsApi = createApi({
      reducerPath: "questionsApi",
      baseQuery: fetchBaseQuery({
            baseUrl: import.meta.env.VITE_BACKEND_BASE_URL,
            credentials: "include",
      }),
      tagTypes: ["Question"],

      endpoints: (builder) => ({
            getQuestions: builder.query<Question[], void>({
                  query: () => `/api/questions`,
                  providesTags: ["Question"],
            }),
            getQuestionById: builder.query<Question, string>({
                  query: (id) => `/api/questions/${id}`,
                  providesTags: (_result, _error, id) => [{ type: "Question", id }],
            }),
            createQuestion: builder.mutation<Question, Partial<Question>>({
                  query: (question) => ({
                        url: `/api/questions`,
                        method: "POST",
                        body: question,
                  }),
                  invalidatesTags: ["Question"],
            }),
            updateQuestion: builder.mutation<Question, Partial<Question> & { id: string }>({
                  query: ({ id, ...question }) => ({
                        url: `/api/questions/${id}`,
                        method: "PUT",
                        body: question,
                  }),
                  invalidatesTags: (_result, _error, { id }) => [{ type: "Question", id }],
            }),
            deleteQuestion: builder.mutation<void, string>({
                  query: (id) => ({
                        url: `/api/questions/${id}`,
                        method: "DELETE",
                  }),
                  invalidatesTags: (_result, _error, id) => [{ type: "Question", id }],
            }),
      }),
});

export const {
      useGetQuestionsQuery,
      useGetQuestionByIdQuery,
      useCreateQuestionMutation,
      useUpdateQuestionMutation,
      useDeleteQuestionMutation,
} = questionsApi;
