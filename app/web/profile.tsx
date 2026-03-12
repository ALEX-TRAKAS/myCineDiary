import { ProtectedRoute } from "@/src/components/auth/protectedRoute";
import { LibraryList } from "@/src/components/libraryList";
import { Paragraph, XStack, YStack } from "tamagui";

export default function Profile() {
  return (
    <ProtectedRoute>
      <XStack flex={1} backgroundColor="#111">
        <YStack width={250} backgroundColor="#181818" padding="$5" gap="$3">
          <Paragraph color="#fff" fontWeight="700" fontSize="$6" mb="$3">
            Filters
          </Paragraph>
        </YStack>

        <YStack flex={1}>
          <Paragraph fontSize="$8" fontWeight="700" color="#fff" padding="$6">
            Your Watchlist
          </Paragraph>

          <YStack flex={1}>
            <LibraryList
              data={[]}
              loading={false}
              loadMore={() => {}}
              layout="vertical"
            />
          </YStack>
        </YStack>
      </XStack>
    </ProtectedRoute>
  );
}
