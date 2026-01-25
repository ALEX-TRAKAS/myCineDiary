import { authFetch } from "@/src/lib/authFetch";
import { clearTokens, saveTokens } from "@/src/lib/tokenStorage";
import { getDeviceId } from "../auth/utils/deviceID";

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:8080/api";

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    email: string;
    username: string;
  };
}

export async function registerUser(data: {
  email: string;
  password: string;
  username: string;
}): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw await res.json();
  }

  return res.json();
}

export async function loginUser(data: {
  email: string;
  password: string;
}): Promise<AuthResponse> {
  const deviceId = await getDeviceId();
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Device-ID": deviceId },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw await res.json();
  }

  const response = await res.json();

  await saveTokens(response.access_token, response.refresh_token);

  return response;
}

export async function logout() {
  await authFetch(`${API_URL}/user/logout`, {
    method: "POST",
  });

  await clearTokens();
}

export async function logoutAll() {
  await authFetch(`${API_URL}/user/logout_all`, {
    method: "POST",
  });

  await clearTokens();
}
