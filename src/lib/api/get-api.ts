const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const GetApiFunction = async (endpoint: string) => {
  const response = await fetch(`${baseUrl}${endpoint}`);

  if (!response.ok) {
    throw new Error("Something went wrong.");
  }

  return await response.json();
};

export const GetApiFunctionWithParams = async (
  endpoint: string,
  params: Record<string, string>
) => {
  const query = new URLSearchParams(params).toString();
  const response = await fetch(`${baseUrl}${endpoint}?${query}`);

  if (!response.ok) {
    throw new Error("Something went wrong.");
  }

  return await response.json();
};

export const GetApiFunctionById = async (endpoint: string, id: string) => {
  const response = await fetch(`${baseUrl}${endpoint}/${id}`);

  if (!response.ok) {
    throw new Error("Something went wrong.");
  }

  return await response.json();
};
