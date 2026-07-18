import { serverFetch } from "./server-fetch";

export const createHtmlLesson = async (lessonData: object) => {
  return await serverFetch(
    "/lesson/html",
    "POST",
    lessonData
  );
};