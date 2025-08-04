import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authenticationApi } from "@/services/authentication";
import { quizzesApi } from "@/services/quizzes";
import { questionsApi } from "@/services/questions";

export const store = configureStore({
  reducer: {
    [authenticationApi.reducerPath]: authenticationApi.reducer,
    [quizzesApi.reducerPath]: quizzesApi.reducer,
    [questionsApi.reducerPath]: questionsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authenticationApi.middleware)
      .concat(quizzesApi.middleware)
      .concat(questionsApi.middleware),
});

setupListeners(store.dispatch);
