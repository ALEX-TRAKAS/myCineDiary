import { Link, Slot, usePathname } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Button, Text, Theme, XStack, YStack } from 'tamagui';


export default function WebLayout() {
  const colorScheme = useColorScheme();
  const pathname = usePathname(); 
  return (
      <Theme name={colorScheme === 'dark' ? 'dark' : 'light'}>
        <YStack flex={1} background="$background">
          {/* Top navbar */}
          <XStack background="$primary" padding="$3" alignItems="center" justifyContent="space-between">
            <Text fontWeight="700" color="$color">MyCineDiary</Text>
            <XStack gap="$3">
              <Link href="/web/home">
                <Button size="$3" themeInverse={pathname === '/web/home'}>Home</Button>
              </Link>
              <Link href="/web/search">
                <Button size="$3" themeInverse={pathname === '/web/search'}>Search</Button>
              </Link>
              <Link href="/web/library">
                <Button size="$3" themeInverse={pathname === '/web/library'}>Library</Button>
              </Link>
            </XStack>
          </XStack>
          <YStack flex={1} padding="$4">
          <Slot></Slot>{}
          </YStack>
        </YStack>
      </Theme>
  );
}
