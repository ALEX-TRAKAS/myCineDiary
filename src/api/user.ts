import { authFetch } from "@/src/lib/authFetch";

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:8080/api";

export async function getCurrentUser() {
  const res = await authFetch(`${API_URL}/user`);

  if (!res.ok) throw await res.json();
  return res.json();
}
