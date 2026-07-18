const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export const serverFetch = async <T>(
    endpoint: string,
    method: HttpMethod,
    body?: T
) => {


    

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method,
        headers: {
            "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
    });


    const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Something went wrong.");
  }

  return result;
};