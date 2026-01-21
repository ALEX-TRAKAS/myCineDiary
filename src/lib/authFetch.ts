import {
    clearTokens,
    getAccessToken,
    getRefreshToken,
    saveTokens,
} from "./tokenStorage";

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:8080/api";

export async function authFetch(
  input: RequestInfo,
  init: RequestInit = {},
): Promise<Response> {
  const accessToken = await getAccessToken();

  const res = await fetch(input, {
    ...init,
    headers: {
      ...(init.headers || {}),
      Authorization: accessToken ? `Bearer ${accessToken}` : "",
      "Content-Type": "application/json",
    },
  });

  if (res.status === 401) {
    const refreshed = await refreshToken();

    if (!refreshed) {
      await clearTokens();
      throw new Error("Unauthorized");
    }

    const newAccessToken = await getAccessToken();

    return fetch(input, {
      ...init,
      headers: {
        ...(init.headers || {}),
        Authorization: `Bearer ${newAccessToken}`,
        "Content-Type": "application/json",
      },
    });
  }

  return res;
}

async function refreshToken(): Promise<boolean> {
  const refreshToken = await getRefreshToken();
  if (!refreshToken) return false;

  const res = await fetch(`${API_URL}/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  if (!res.ok) return false;

  const data = await res.json();

  await saveTokens(data.access_token, data.refresh_token);
  return true;
}
