export type HttpMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

interface FetchOptions extends RequestInit {
  method?: HttpMethod;
  body?: any;
}

export async function apiRequest<T>(
  endpoint: string,
  { method = "GET", body, headers, ...customConfig }: FetchOptions = {}
): Promise<T> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(headers || {}),
      },
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store", // always fresh data (for SSR)
      ...customConfig,
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`API Error (${res.status}): ${errorText}`);
    }

    return res.json();
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
}
