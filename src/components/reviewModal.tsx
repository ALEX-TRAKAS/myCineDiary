import { Button, Dialog, Text, TextArea, XStack } from "tamagui";

import StarRating from "@/src/components/starRating";
import { useState } from "react";

interface ReviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: {
    rating: number;
    reviewText: string;
    isSpoiler: boolean;
  }) => void;
}

export default function ReviewModal({
  open,
  onOpenChange,
  onSubmit,
}: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isSpoiler, setIsSpoiler] = useState(false);

  const handleSubmit = () => {
    onSubmit({
      rating,
      reviewText,
      isSpoiler,
    });
    setRating(0);
    setReviewText("");
    setIsSpoiler(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content p="$6" gap="$4">
          <Text fontSize="$7" fontWeight="700">
            Write a Review
          </Text>

          <StarRating rating={rating} setRating={setRating} />

          <TextArea
            placeholder="Share your thoughts..."
            value={reviewText}
            onChangeText={setReviewText}
          />

          <XStack ai="center" gap="$3">
            <Button
              size="$3"
              backgroundColor={isSpoiler ? "$red9" : "$color3"}
              onPress={() => setIsSpoiler((prev) => !prev)}
            >
              {isSpoiler ? "⚠ Spoiler Included" : "Mark as Spoiler"}
            </Button>
          </XStack>

          <Button onPress={handleSubmit}>Submit</Button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}
