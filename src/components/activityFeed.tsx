import { Paragraph, XStack, YStack } from "tamagui";

export function ActivityFeed({ activities }: { activities: any[] }) {
  if (!activities.length) {
    return <Paragraph color="#aaa">No activity yet</Paragraph>;
  }

  return (
    <YStack gap="$3">
      {activities.map((activity, index) => (
        <XStack key={index}>
          <Paragraph color="#fff">
            {activity.type === "rate_movie" &&
              `⭐ Rated movie ${activity.movie_id} ${activity.rating}/10`}

            {activity.type === "add_watchlist" &&
              `📌 Added movie ${activity.movie_id} to watchlist`}

            {activity.type === "add_favorite" &&
              `❤️ Added movie ${activity.movie_id} to favorites`}

            {activity.type === "complete_movie" &&
              `🎬 Completed movie ${activity.movie_id}`}
          </Paragraph>
        </XStack>
      ))}
    </YStack>
  );
}
