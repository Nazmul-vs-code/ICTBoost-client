import { serverFetch } from "./server-fetch";

export const createCLesson = async (lessonData: object) => {
  return await serverFetch(
    "/lesson/c",
    "POST",
    lessonData
  );
};
