import { apiSlice } from "../api/apiSlice";

export const coursesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data) => ({
        url: "courses/create-course",
        method: "POST",
        body: data,
        credentials: "include" as const,
        mode: "no-cors",
        referrerPolicy: "strict-origin-when-cross-origin",
      }),
    }),
    getAllCoursesAdmin: builder.query({
      query: () => ({
        url: "courses/get-all-courses",
        method: "GET",
        credentials: "include" as const,
        mode: "no-cors",
        referrerPolicy: "strict-origin-when-cross-origin",
      }),
    }),
    getAllCourseUser: builder.query({
      query: ({ pageNumber, limit }) => ({
        url: `courses/get-courses${
          pageNumber && limit ? `?page=${pageNumber}&limit=${limit}` : ""
        }`,
        method: "GET",
        credentials: "include" as const,
        mode: "no-cors",
        referrerPolicy: "strict-origin-when-cross-origin",
      }),
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `courses/delete-course/${id}`,
        method: "DELETE",
        credentials: "include" as const,
        mode: "no-cors",
        referrerPolicy: "strict-origin-when-cross-origin",
      }),
    }),
    editCourse: builder.mutation({
      query: ({ id, data }) => ({
        url: `courses/update-course/${id}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
        mode: "no-cors",
        referrerPolicy: "strict-origin-when-cross-origin",
      }),
    }),
    getCourseDetails: builder.query({
      query: (id) => ({
        url: `courses/get-course/${id}`,
        method: "GET",
        credentials: "include" as const,
        mode: "no-cors",
        referrerPolicy: "strict-origin-when-cross-origin",
      }),
    }),
    getCourseContent: builder.query({
      query: (id) => ({
        url: `courses/get-course-content/${id}`,
        method: "GET",
        credentials: "include" as const,
        mode: "no-cors",
        referrerPolicy: "strict-origin-when-cross-origin",
      }),
    }),
    addNewQuestion: builder.mutation({
      query: ({ question, courseId, contentId }) => ({
        url: "courses/add-question",
        method: "PUT",
        body: {
          question,
          courseId,
          contentId,
        },
        credentials: "include" as const,
        mode: "no-cors",
        referrerPolicy: "strict-origin-when-cross-origin",
      }),
    }),
    addNewAnswer: builder.mutation({
      query: ({ answer, courseId, contentId, questionId }) => ({
        url: "courses/add-answer",
        method: "PUT",
        body: { answer, courseId, contentId, questionId },
        credentials: "include" as const,
        mode: "no-cors",
        referrerPolicy: "strict-origin-when-cross-origin",
      }),
    }),
    addReview: builder.mutation({
      query: ({ review, courseId, rating }) => ({
        url: `courses/add-review/${courseId}`,
        method: "PUT",
        body: { review, rating },
        credentials: "include" as const,
        mode: "no-cors",
        referrerPolicy: "strict-origin-when-cross-origin",
      }),
    }),
    addReplyToReview: builder.mutation({
      query: ({ comment, courseId, reviewId }: any) => ({
        url: "courses/add-reply",
        method: "PUT",
        body: {
          comment,
          courseId,
          reviewId,
        },
        credentials: "include" as const,
        mode: "no-cors",
        referrerPolicy: "strict-origin-when-cross-origin",
      }),
    }),
    searchCourse: builder.query({
      query: (title) => ({
        url: `${title === "" ? null : `courses/search?title=${title}`}`,
        method: "GET",
        credentials: "include" as const,
        mode: "no-cors",
        referrerPolicy: "strict-origin-when-cross-origin",
      }),
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetAllCoursesAdminQuery,
  useGetAllCourseUserQuery,
  useDeleteCourseMutation,
  useEditCourseMutation,
  useGetCourseDetailsQuery,
  useGetCourseContentQuery,
  useAddNewQuestionMutation,
  useAddNewAnswerMutation,
  useAddReviewMutation,
  useAddReplyToReviewMutation,
  useSearchCourseQuery,
} = coursesApi;
