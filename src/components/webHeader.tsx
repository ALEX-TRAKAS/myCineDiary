import { Link, usePathname } from "expo-router";
import { Button, XStack } from "tamagui";

export function WebHeader() {
  const pathname = usePathname();

  return (
    <XStack
      background="$primary"
      padding="$3"
      alignItems="center"
      justifyContent="space-between" >
      <XStack gap="$3">
        <Link href="/web/home">
          <Button size="$3" themeInverse={pathname === "/web/home"}>
            Home
          </Button>
        </Link>

        <Link href="/web/search">
          <Button size="$3" themeInverse={pathname === "/web/search"}>
            Search
          </Button>
        </Link>

        <Link href="/web/library">
          <Button size="$3" themeInverse={pathname === "/web/library"}>
            Library
          </Button>
        </Link>

         <Link href="/web/profile">
          <Button size="$3" themeInverse={pathname === "/web/profile"}>
            Profile
          </Button>
        </Link>
      </XStack>
    </XStack>
  );
}
