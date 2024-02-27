import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Company } from '../../../core/models/company';
import { getJwtToken } from '../auth/authService';

export const companiesApi = createApi({
  reducerPath: 'companies',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL as string, credentials: 'include' }),
  endpoints: (builder) => ({
    getCompanies: builder.query<Company[], string>({
      query: (query) => ({ url: `/companies?${query}`, headers: { Authorization: `Bearer ${getJwtToken()}` } })
    })
  })
});

export const { useGetCompaniesQuery } = companiesApi;
