import { useState } from "react";
import { Text } from "react-native";

export default function SpoilerText(text: any) {
  const [revealed, setRevealed] = useState(false);

  return (
    <Text
      onPress={() => setRevealed(true)}
      style={{
        filter: revealed ? "none" : "blur(6px)",
      }}
    >
      {text}
    </Text>
  );
}
