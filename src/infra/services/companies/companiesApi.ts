import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Company } from '../../../core/models/company';

export const companiesApi = createApi({
  reducerPath: 'companies',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL as string, credentials: 'include' }),
  endpoints: (builder) => ({
    getCompanies: builder.query<Company[], string>({
      query: (query) => `/companies?${query}` // Ensure proper query string construction
    })
  })
});

export const { useGetCompaniesQuery } = companiesApi;
