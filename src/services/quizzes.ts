import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  Quiz,
  Question,
  Answer,
  QuizSettings,
  QuizResults,
} from "@/types";

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

    getQuizById: builder.query<Quiz, string>({
      query: (id) => `/api/quizzes/${id}`,
      providesTags: (result, error, id) => [{ type: "Quiz", id }],
    }),

    createQuiz: builder.mutation<Quiz, Pick<Quiz, "title" | "description">>({
      query: (data) => ({
        url: `/api/quizzes`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Quiz"],
    }),

    updateQuiz: builder.mutation<Quiz, { id: string; data: Partial<Quiz> }>({
      query: ({ id, data }) => ({
        url: `/api/quizzes/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Quiz", id }],
    }),

    deleteQuiz: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/api/quizzes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Quiz"],
    }),

    getQuizQuestions: builder.query<Question[], string>({
      query: (quizId) => `/api/quizzes/${quizId}/questions`,
      providesTags: ["Question"],
    }),

    getQuizQuestionById: builder.query<
      Question,
      { quizId: string; questionId: string }
    >({
      query: ({ quizId, questionId }) =>
        `/api/quizzes/${quizId}/questions/${questionId}`,
      providesTags: ["Question"],
    }),

    createQuestion: builder.mutation<
      Question,
      { quizId: string; data: Partial<Question> }
    >({
      query: ({ quizId, data }) => ({
        url: `/api/quizzes/${quizId}/questions`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Question"],
    }),

    updateQuestion: builder.mutation<
      Question,
      { quizId: string; questionId: string; data: Partial<Question> }
    >({
      query: ({ quizId, questionId, data }) => ({
        url: `/api/quizzes/${quizId}/questions/${questionId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Question"],
    }),

    deleteQuestion: builder.mutation<
      { success: boolean },
      { quizId: string; questionId: string }
    >({
      query: ({ quizId, questionId }) => ({
        url: `/api/quizzes/${quizId}/questions/${questionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Question"],
    }),

    getAnswers: builder.query<Answer[], { quizId: string; questionId: string }>(
      {
        query: ({ quizId, questionId }) =>
          `/api/quizzes/${quizId}/questions/${questionId}/answers`,
        providesTags: ["Answer"],
      },
    ),

    getAnswerById: builder.query<
      Answer,
      { quizId: string; questionId: string; answerId: string }
    >({
      query: ({ quizId, questionId, answerId }) =>
        `/api/quizzes/${quizId}/questions/${questionId}/answers/${answerId}`,
      providesTags: ["Answer"],
    }),

    createAnswer: builder.mutation<
      Answer,
      { quizId: string; questionId: string; data: Partial<Answer> }
    >({
      query: ({ quizId, questionId, data }) => ({
        url: `/api/quizzes/${quizId}/questions/${questionId}/answers`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Answer"],
    }),

    updateAnswer: builder.mutation<
      Answer,
      {
        quizId: string;
        questionId: string;
        answerId: string;
        data: Partial<Answer>;
      }
    >({
      query: ({ quizId, questionId, answerId, data }) => ({
        url: `/api/quizzes/${quizId}/questions/${questionId}/answers/${answerId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Answer"],
    }),

    deleteAnswer: builder.mutation<
      { success: boolean },
      { quizId: string; questionId: string; answerId: string }
    >({
      query: ({ quizId, questionId, answerId }) => ({
        url: `/api/quizzes/${quizId}/questions/${questionId}/answers/${answerId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Answer"],
    }),

    getQuizSettings: builder.query<QuizSettings, string>({
      query: (quizId) => `/api/quizzes/${quizId}/settings`,
      providesTags: ["Settings"],
    }),

    updateQuizSettings: builder.mutation<
      QuizSettings,
      { quizId: string; data: Partial<QuizSettings> }
    >({
      query: ({ quizId, data }) => ({
        url: `/api/quizzes/${quizId}/settings`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Settings"],
    }),

    getQuizResults: builder.mutation<QuizResults, string>({
      query: (quizId) => ({
        url: `/api/quizzes/${quizId}/results`,
        method: "PUT",
      }),
      invalidatesTags: ["Results"],
    }),

    startQuiz: builder.mutation<{ success: boolean }, string>({
      query: (quizId) => ({
        url: `/api/quizzes/${quizId}/start`,
        method: "PUT",
      }),
      invalidatesTags: ["Quiz"],
    }),
  }),
});

export const {
  useGetQuizzesQuery,
  useGetQuizByIdQuery,
  useCreateQuizMutation,
  useUpdateQuizMutation,
  useDeleteQuizMutation,

  useGetQuizQuestionsQuery,
  useGetQuizQuestionByIdQuery,
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,

  useGetAnswersQuery,
  useGetAnswerByIdQuery,
  useCreateAnswerMutation,
  useUpdateAnswerMutation,
  useDeleteAnswerMutation,

  useGetQuizSettingsQuery,
  useUpdateQuizSettingsMutation,

  useGetQuizResultsMutation,
  useStartQuizMutation,
} = quizzesApi;
