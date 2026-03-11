import { fetchNextEpisode, fetchTrendingTv } from "@/src/api/tmbdApi";
import { AuthProvider } from "@/src/auth/AuthContext";
import { ProtectedRoute } from "@/src/components/auth/protectedRoute";
import { useEffect, useState } from "react";
import { Calendar } from "react-native-calendars";
import { Text, YStack } from "tamagui";

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState("");
  const [episodesByDate, setEpisodesByDate] = useState<Record<string, any[]>>(
    {},
  );

  useEffect(() => {
    async function loadCalendar() {
      try {
        const trending = await fetchTrendingTv("tv");

        const grouped: Record<string, any[]> = {};

        await Promise.all(
          trending.results.slice(0, 20).map(async (show: any) => {
            const episode = await fetchNextEpisode(show.id);

            if (!episode || !episode.air_date) return;

            const date = episode.air_date;

            if (!grouped[date]) {
              grouped[date] = [];
            }

            grouped[date].push({
              show: show.name,
              season: episode.season_number,
              episode: episode.episode_number,
              title: episode.name,
            });
          }),
        );

        setEpisodesByDate(grouped);
      } catch (err) {
        console.error("Calendar error:", err);
      }
    }

    loadCalendar();
  }, []);

  const selectedEpisodes = episodesByDate[selectedDate] || [];

  return (
    <ProtectedRoute>
      <AuthProvider>
        <YStack flex={1} background="$background" padding="$4" gap="$4">
          <Text fontSize="$8" fontWeight="700">
            Episode Calendar
          </Text>

          <Calendar
            onDayPress={(day) => {
              setSelectedDate(day.dateString);
            }}
            markedDates={{
              ...Object.keys(episodesByDate).reduce((acc, date) => {
                acc[date] = { marked: true };
                return acc;
              }, {} as any),
              [selectedDate]: {
                selected: true,
                selectedColor: "#6c5ce7",
              },
            }}
            theme={{
              backgroundColor: "$background",
              calendarBackground: "$background",
              dayTextColor: "#fff",
              monthTextColor: "#fff",
              arrowColor: "#6c5ce7",
              todayTextColor: "#6c5ce7",
              dotColor: "#6c5ce7",
            }}
          />

          <YStack gap="$2">
            <Text fontSize="$6" fontWeight="600">
              Episodes on {selectedDate || "Select a day"}
            </Text>

            {selectedEpisodes.length === 0 && (
              <Text opacity={0.6}>No episodes</Text>
            )}

            {selectedEpisodes.map((ep, i) => (
              <YStack
                key={i}
                padding="$3"
                borderRadius="$4"
                background="$backgroundStrong"
              >
                <Text fontWeight="700">{ep.show}</Text>

                <Text opacity={0.8}>
                  S{ep.season}E{ep.episode} — {ep.title}
                </Text>
              </YStack>
            ))}
          </YStack>
        </YStack>
      </AuthProvider>
    </ProtectedRoute>
  );
}
