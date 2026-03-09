import { AuthProvider } from "@/src/auth/AuthContext";
import { ProtectedRoute } from "@/src/components/auth/protectedRoute";
import { useState } from "react";
import { Calendar } from "react-native-calendars";
import { Text, YStack } from "tamagui";

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState("");

  const episodesByDate: Record<string, any[]> = {
    "2026-03-09": [],
    "2026-03-10": [],
  };

  const selectedEpisodes = episodesByDate[selectedDate] || [];

  return (
    <ProtectedRoute>
      <AuthProvider>
        <YStack flex={1} background="$background" padding="$4" gap="$4">
          <Text fontSize="$8" fontWeight="700">
            Release Calendar
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

              textDisabledColor: "#555",
              arrowColor: "#6c5ce7",

              todayTextColor: "#6c5ce7",

              dotColor: "#6c5ce7",
              selectedDotColor: "#ffffff",

              textDayFontWeight: "500",
              textMonthFontWeight: "700",
            }}
          />
          <YStack gap="$2">
            <Text fontSize="$6" fontWeight="600">
              Episodes on {selectedDate || "Select a day"}
            </Text>

            {selectedEpisodes.length === 0 && (
              <Text opacity={0.6}>No releases</Text>
            )}

            {selectedEpisodes.map((ep, i) => (
              <YStack
                key={i}
                padding="$3"
                borderRadius="$4"
                background="$backgroundStrong"
              >
                <Text fontWeight="600">{ep.show}</Text>
                <Text opacity={0.7}>{ep.episode}</Text>
              </YStack>
            ))}
          </YStack>
        </YStack>
      </AuthProvider>
    </ProtectedRoute>
  );
}
