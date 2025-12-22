import { WebHeader } from '@/components/webHeader';
import { Slot } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Text, Theme, XStack, YStack } from 'tamagui';


export default function WebLayout() {
  const colorScheme = useColorScheme();
  return (
      <Theme name={colorScheme === 'dark' ? 'dark' : 'light'}>
        <YStack flex={1} background="$background">
          {/* Top navbar */}
          <XStack background="$primary" padding="$3" alignItems="center" justifyContent="space-between">
            <Text fontWeight="700" color="$color">MyCineDiary</Text>
             <WebHeader />
          </XStack>
          <YStack flex={1} padding="$4">
          <Slot></Slot>{}
          </YStack>
        </YStack>
      </Theme>
  );
}
