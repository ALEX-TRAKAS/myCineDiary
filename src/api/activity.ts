import { authFetch } from "@/src/lib/authFetch";

export async function getUserActivity() {
  const response = await authFetch(
    `${process.env.EXPO_PUBLIC_API_URL}/users/me/activity`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch activity feed");
  }

  return response.json();
}
