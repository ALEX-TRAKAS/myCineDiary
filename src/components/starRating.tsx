import { Star } from "@tamagui/lucide-icons";
import { XStack } from "tamagui";

interface StarRatingProps {
  rating: number;
  setRating: (value: number) => void;
}

export default function starRating({ rating, setRating }: StarRatingProps) {
  return (
    <XStack gap="$2">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
        <Star
          key={value}
          size={20}
          fill={value <= rating ? "gold" : "transparent"}
          onPress={() => setRating(value)}
        />
      ))}
    </XStack>
  );
}
