import { serverFetch } from "./server-fetch";

export const toggleLikeC = async (lessonId: string, authorEmail: string, likedByEmail: string) => {
  return await serverFetch("/lesson/c/like", "POST", {
    lessonId,
    authorEmail,
    likedByEmail,
  });
};
