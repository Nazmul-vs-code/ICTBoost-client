const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || "https://ict-boost-server.vercel.app";

export const deleteLesson = async (subject: "html" | "c", lessonId: string) => {
  const response = await fetch(`${BASE_URL}/lesson/${subject}/${lessonId}`, {
    method: "DELETE",
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to delete lesson.");
  }

  return result;
};
