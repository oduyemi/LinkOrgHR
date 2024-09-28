import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { addTokenToRequest } from "../../lib/token";
import { Application, JobApplication, JobApplications, JobPosting, JobPostingDetails } from "../../types/onboarding";

export const recruitmentApi = createApi({
    reducerPath: "recruitmentApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_APP_HR_BASE_URL}`,
        prepareHeaders: (headers, { getState }: any) => {
            return addTokenToRequest(headers, { getState });
        },
    }),
    tagTypes: ["recruitment"],
    endpoints: (build) => ({
        postJob: build.mutation<any, JobPostingDetails>({
            query: (data) => ({
                url: `Recruitment/PostJob`,
                method: "POST",
                body: data,
            }),
        }),
        allPostedJobs: build.mutation<JobPostingDetails[], any>({
            query: () => ({
                url: `Recruitment/getallJobs`,
                method: "GET",
            }),
        }),
        removeJob: build.mutation<any, any>({
            query: (id) => ({
                url: `Recruitment/${id}`,
                method: "DELETE",
            }),
        }),
        getJob: build.mutation<JobPostingDetails, any>({
            query: (id) => ({
                url: `Recruitment/getJob/${id}`,
                method: "Get",
            }),
        }),
        getApplications: build.mutation<Application, any>({
            query: () => ({
                url: `/Applicants`,
                method: "Get",
            }),
        }),
        getApplication: build.mutation<JobApplication, any>({
            query: (id) => ({
                url: `/Applicants/${id}`,
                method: "Get",
            }),
        }),
        getApplicationsByJobId: build.mutation<JobApplications[], any>({
            query: (id) => ({
                url: `/Applicants/GetllApplicantsBy/${id}`,
                method: "Get",
            }),
        }),
    }),
});

export const { usePostJobMutation, useAllPostedJobsMutation, useRemoveJobMutation, useGetJobMutation, useGetApplicationsMutation, useGetApplicationMutation, useGetApplicationsByJobIdMutation } = recruitmentApi;
