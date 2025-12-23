import { WebFooter } from '@/src/components/webFooter';
import { WebHeader } from '@/src/components/webHeader';
import { Slot } from 'expo-router';
import { ScrollView, useColorScheme } from 'react-native';
import { Theme, XStack, YStack } from 'tamagui';


export default function WebLayout() {
  const colorScheme = useColorScheme();
    return (
    <Theme name={colorScheme === 'dark' ? 'dark' : 'light'}>
      <YStack flex={1} background="$background">
        <XStack background="$primary" padding="$3" alignItems="center" justifyContent="space-between">
          <WebHeader/>
        </XStack>
        <ScrollView  contentContainerStyle={{ flexGrow: 1 }}>
          <YStack padding="$4" flex={1}>
            <Slot/>
            <WebFooter/>
          </YStack>
        </ScrollView>
      </YStack>
    </Theme>
  );
}

