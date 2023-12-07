import { apiSlice } from "../api/apiSlice";

export const coursesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data) => ({
        url: "courses/create-course",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getAllCoursesAdmin: builder.query({
      query: () => ({
        url: "courses/get-all-courses",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getAllCourseUser: builder.query({
      query: () => ({
        url: "courses/get-courses",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `courses/delete-course/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
    editCourse: builder.mutation({
      query: ({ id, data }) => ({
        url: `courses/update-course/${id}`,
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getCourseDetails: builder.query({
      query: (id) => ({
        url: `courses/get-course/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getCourseContent: builder.query({
      query: (id) => ({
        url: `courses/get-course-content/${id}`,
        method: "GET",
        credentials: "include" as const,
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
      }),
    }),
    addNewAnswer: builder.mutation({
      query: ({ answer, courseId, contentId, questionId }) => ({
        url: "courses/add-answer",
        method: "PUT",
        body: { answer, courseId, contentId, questionId },
        credentials: "include" as const,
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
} = coursesApi;
