import { Href, Link } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Button, Input, Paragraph, Separator, XStack, YStack } from "tamagui";

import { loginUser, registerUser } from "../../src/api/auth";

interface Props {
  type: "sign-up" | "sign-in";
  isAuth: boolean;
  onSuccess?: () => void;
}

export interface SignData {
  email: string;
  password: string;
  username?: string;
}

export const SignUpSignInComponent: React.FC<Props> = ({
  type,
  isAuth,
  onSuccess,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignData>({
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
    mode: "onTouched",
  });

  const onSubmit = async (data: SignData) => {
    try {
      const response =
        type === "sign-up"
          ? await registerUser({
              email: data.email,
              password: data.password,
              username: data.username!,
            })
          : await loginUser({
              email: data.email,
              password: data.password,
            });

      console.log("Auth success:", response);
      onSuccess?.();
    } catch (err) {
      console.error("Auth error:", err);
    }
  };

  const authHref: Href = (type === "sign-up" ? "/signin" : "/signup") as Href;
  return (
    <YStack
      backgroundColor="$background"
      borderRadius="$10"
      px="$7"
      py="$6"
      w={350}
      space="$4"
      shadowColor="#00000020"
      shadowRadius={26}
      shadowOffset={{ width: 0, height: 4 }}
    >
      <Paragraph size="$5" fontWeight="700" opacity={0.8}>
        {type === "sign-up" ? "Create account" : "Login"}
      </Paragraph>

      <Separator />

      {/* Email */}
      <Controller
        control={control}
        name="email"
        rules={{ required: "Email is required" }}
        render={({ field }) => (
          <>
            <Input
              {...field}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && (
              <Paragraph size="$2" color="$red10">
                {errors.email.message}
              </Paragraph>
            )}
          </>
        )}
      />

      {/* Username (sign-up only) */}
      {type === "sign-up" && (
        <Controller
          control={control}
          name="username"
          rules={{
            required: "Username is required",
            minLength: { value: 3, message: "Min 3 characters" },
          }}
          render={({ field }) => (
            <>
              <Input {...field} placeholder="Username" />
              {errors.username && (
                <Paragraph size="$2" color="$red10">
                  {errors.username.message}
                </Paragraph>
              )}
            </>
          )}
        />
      )}

      {/* Password */}
      <Controller
        control={control}
        name="password"
        rules={{
          required: "Password is required",
          minLength: { value: 8, message: "Min 8 characters" },
        }}
        render={({ field }) => (
          <>
            <Input {...field} placeholder="Password" secureTextEntry />
            {errors.password && (
              <Paragraph size="$2" color="$red10">
                {errors.password.message}
              </Paragraph>
            )}
          </>
        )}
      />

      <Button disabled={isAuth} onPress={handleSubmit(onSubmit)}>
        {type === "sign-up" ? "Sign up" : "Sign in"}
      </Button>

      <XStack>
        <Paragraph size="$2" opacity={0.6} mr="$2">
          {type === "sign-up" ? "Already have an account?" : "No account yet?"}
        </Paragraph>

        <Link href={authHref}>
          <Paragraph
            size="$2"
            fontWeight="700"
            color="$blue9Light"
            cursor="pointer"
          >
            {type === "sign-up" ? "Sign in" : "Sign up"}
          </Paragraph>
        </Link>
      </XStack>
    </YStack>
  );
};
