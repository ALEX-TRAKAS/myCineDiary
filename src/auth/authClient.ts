import {
    clearTokens,
    getAccessToken,
    getRefreshToken,
    saveTokens,
} from "@/src/lib/tokenStorage";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

let isRefreshing = false;
let queue: ((token: string | null) => void)[] = [];

async function refreshAccessToken() {
  const refreshToken = await getRefreshToken();
  if (!refreshToken) throw new Error("No refresh token");

  const res = await fetch(`${API_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) throw new Error("Refresh failed");

  const data = await res.json();
  await saveTokens(data.accessToken, data.refreshToken);

  return data.accessToken;
}

export async function authFetch(input: RequestInfo, init: RequestInit = {}) {
  const token = await getAccessToken();

  const res = await fetch(input, {
    ...init,
    headers: {
      ...init.headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  if (res.status !== 401) return res;

  if (!isRefreshing) {
    isRefreshing = true;

    try {
      const newToken = await refreshAccessToken();
      queue.forEach((cb) => cb(newToken));
      queue = [];
    } catch {
      queue.forEach((cb) => cb(null));
      queue = [];
      await clearTokens();
      throw new Error("Session expired");
    } finally {
      isRefreshing = false;
    }
  }

  return new Promise<Response>((resolve, reject) => {
    queue.push(async (token) => {
      if (!token) return reject("Unauthorized");

      const retry = await fetch(input, {
        ...init,
        headers: {
          ...init.headers,
          Authorization: `Bearer ${token}`,
        },
      });

      resolve(retry);
    });
  });
}
