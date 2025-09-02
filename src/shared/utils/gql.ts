// utils/gql.ts
export async function gqlRequest<T>(
  query: string,
  variables?: Record<string, any>
) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // if your GraphQL is protected:
      // "Authorization": `Bearer ${process.env.STRAPI_TOKEN}`,
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store", // or "force-cache" / "default" depending on your needs
  });

  if (!res.ok) {
    throw new Error(`GraphQL error: ${res.statusText}`);
  }

  const { data, errors } = await res.json();
  if (errors) throw new Error(JSON.stringify(errors));
  return data as T;
}
