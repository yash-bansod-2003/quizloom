import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Session } from '@/types/index.ts'

export const authenticationApi = createApi({
      reducerPath: 'authenticationApi',
      baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_BASE_URL, credentials: 'include' }),
      endpoints: (builder) => ({
            getSession: builder.query<Session, void>({
                  query: () => `/api/auth/get-session`,
            }),
      }),
})

export const { useGetSessionQuery } = authenticationApi;