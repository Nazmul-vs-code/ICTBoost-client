import { serverFetch } from "./server-fetch";

export const toggleLike = async (lessonId: string, authorEmail: string, likedByEmail: string) => {
  return await serverFetch("/lesson/html/like", "POST", {
    lessonId,
    authorEmail,
    likedByEmail,
  });
};
