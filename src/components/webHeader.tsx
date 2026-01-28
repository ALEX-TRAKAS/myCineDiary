import { Link, usePathname } from "expo-router";
import { Button, XStack } from "tamagui";

export function WebHeader() {
  const pathname = usePathname();

  return (
    <XStack bg="$primary" px="$4" py="$3" ai="center" jc="space-between">
      <XStack gap="$3">
        <Link href="/web/home">
          <Button size="$3" themeInverse={pathname === "/web/home"}>
            Home
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

      <XStack gap="$3">
        <Link href="/signin">
          <Button size="$3" themeInverse={pathname === "/signin"}>
            Sign in
          </Button>
        </Link>

        <Link href="/signup">
          <Button size="$3" themeInverse={pathname === "/signup"}>
            Sign up
          </Button>
        </Link>
      </XStack>
    </XStack>
  );
}
