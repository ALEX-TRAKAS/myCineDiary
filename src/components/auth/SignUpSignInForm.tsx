import { Controller, useForm } from "react-hook-form";
import { Button, Input, Paragraph, Separator, XStack, YStack } from "tamagui";

import { loginUser, registerUser } from "@/src/api/auth";

interface Props {
  type: "sign-up" | "sign-in";
  isAuth: boolean;
  onSuccess?: () => void;
  onSwitchMode?: () => void;
}

export interface SignData {
  email: string;
  password: string;
  username?: string;
}

export const SignUpSignInForm: React.FC<Props> = ({
  type,
  isAuth,
  onSuccess,
  onSwitchMode,
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
        render={({ field: { value, onChange, onBlur } }) => (
          <>
            <Input
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
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

      {/* Username */}
      {type === "sign-up" && (
        <Controller
          control={control}
          name="username"
          rules={{
            required: "Username is required",
            minLength: { value: 3, message: "Min 3 characters" },
          }}
          render={({ field: { value, onChange, onBlur } }) => (
            <>
              <Input
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Username"
              />
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
        render={({ field: { value, onChange, onBlur } }) => (
          <>
            <Input
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Password"
              secureTextEntry
            />
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

        <Paragraph
          size="$2"
          fontWeight="700"
          color="$blue9Light"
          cursor="pointer"
          onPress={onSwitchMode}
        >
          {type === "sign-up" ? "Sign in" : "Sign up"}
        </Paragraph>
      </XStack>
    </YStack>
  );
};
