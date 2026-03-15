import { getUserActivity } from "@/src/api/activity";
import { ActivityFeed } from "@/src/components/activityFeed";
import { ProtectedRoute } from "@/src/components/auth/protectedRoute";
import { LibraryList } from "@/src/components/libraryList";

import { useEffect, useState } from "react";
import { Avatar, Button, Paragraph, XStack, YStack } from "tamagui";

export default function Profile() {
  const [activeOption, setActiveOption] = useState("profile");

  const [activities, setActivities] = useState<any[]>([]);
  const [loadingActivity, setLoadingActivity] = useState(false);

  const options = [
    "profile",
    "activity",
    "edit-profile",
    "change-password",
    "notifications",
    "appearance",
    "logout",
  ];

  useEffect(() => {
    if (activeOption === "activity") {
      fetchActivity();
    }
  }, [activeOption]);

  async function fetchActivity() {
    try {
      setLoadingActivity(true);

      const data = await getUserActivity();
      setActivities(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingActivity(false);
    }
  }

  return (
    <ProtectedRoute>
      <XStack flex={1} backgroundColor="#111">
        <YStack width={250} backgroundColor="#181818" padding="$5" gap="$3">
          <Paragraph color="#fff" fontWeight="700" fontSize="$6" mb="$3">
            MENU
          </Paragraph>

          {options.map((option) => (
            <Button
              key={option}
              onPress={() => setActiveOption(option)}
              backgroundColor={
                activeOption === option ? "$primary" : "transparent"
              }
              color="#fff"
              justifyContent="flex-start"
            >
              {option.toUpperCase()}
            </Button>
          ))}
        </YStack>

        <YStack flex={1} padding="$6" gap="$5">
          {activeOption === "profile" && (
            <>
              <XStack alignItems="center" gap="$4">
                <Avatar circular size="$8">
                  <Avatar.Image src="https://i.pravatar.cc/300" />
                  <Avatar.Fallback backgroundColor="$gray6" />
                </Avatar>

                <YStack>
                  <Paragraph fontSize="$7" fontWeight="700" color="#fff">
                    John Doe
                  </Paragraph>
                  <Paragraph color="#aaa">Movie enthusiast 🎬</Paragraph>
                </YStack>
              </XStack>

              <XStack gap="$6" flexWrap="wrap">
                <YStack>
                  <Paragraph color="#aaa">Movies Watched</Paragraph>
                  <Paragraph color="#fff" fontSize="$6" fontWeight="700">
                    124
                  </Paragraph>
                </YStack>

                <YStack>
                  <Paragraph color="#aaa">Favorites</Paragraph>
                  <Paragraph color="#fff" fontSize="$6" fontWeight="700">
                    18
                  </Paragraph>
                </YStack>

                <YStack>
                  <Paragraph color="#aaa">Reviews</Paragraph>
                  <Paragraph color="#fff" fontSize="$6" fontWeight="700">
                    9
                  </Paragraph>
                </YStack>

                <YStack>
                  <Paragraph color="#aaa">Avg Rating</Paragraph>
                  <Paragraph color="#fff" fontSize="$6" fontWeight="700">
                    ⭐ 8.2
                  </Paragraph>
                </YStack>
              </XStack>
            </>
          )}

          {activeOption === "activity" && (
            <YStack>
              <Paragraph
                fontSize="$6"
                fontWeight="700"
                color="#fff"
                marginBottom="$4"
              >
                Activity Feed
              </Paragraph>

              {loadingActivity ? (
                <Paragraph color="#aaa">Loading activity...</Paragraph>
              ) : (
                <ActivityFeed activities={activities} />
              )}
            </YStack>
          )}

          {activeOption === "profile" && (
            <YStack flex={1} marginTop="$4">
              <Paragraph
                fontSize="$6"
                fontWeight="700"
                color="#fff"
                marginBottom="$3"
              >
                Recent Library
              </Paragraph>

              <LibraryList
                data={[]}
                loading={false}
                loadMore={() => {}}
                layout="vertical"
              />
            </YStack>
          )}
        </YStack>
      </XStack>
    </ProtectedRoute>
  );
}
