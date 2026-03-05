import { useState } from "react";
import { Pressable, Text } from "react-native";

export default function SpoilerText({ text }: { text: string }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <Pressable onPress={() => setRevealed(true)}>
      <Text
        style={{
          ...(revealed
            ? {}
            : {
                color: "transparent",
                textShadowColor: "rgb(255, 255, 255)",
                textShadowOffset: { width: 0, height: 0 },
                textShadowRadius: 6,
              }),
        }}
      >
        {text}
      </Text>
    </Pressable>
  );
}
