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
  confirmPassword?: string;
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
    watch,
  } = useForm<SignData>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
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
      backgroundColor="#ffffff"
      borderRadius="$10"
      px="$7"
      py="$6"
      w={350}
      gap="$4"
      shadowColor="#00000020"
      shadowRadius={26}
      shadowOffset={{ width: 0, height: 4 }}
    >
      <Paragraph fontWeight="700" color="#000" size="$5" opacity={0.8}>
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
              backgroundColor="#fff"
              color="#000"
              borderColor="#000"
              placeholderTextColor="#666"
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
                backgroundColor="#fff"
                color="#000"
                borderColor="#000"
                placeholderTextColor="#666"
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

      <Controller
        control={control}
        name="password"
        rules={{
          required: "Password is required",
          ...(type === "sign-up" && {
            minLength: { value: 8, message: "Min 8 characters" },
          }),
        }}
        render={({ field: { value, onChange, onBlur } }) => (
          <>
            <Input
              backgroundColor="#fff"
              color="#000"
              borderColor="#000"
              placeholderTextColor="#666"
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

      {type === "sign-up" && (
        <Controller
          control={control}
          name="confirmPassword"
          rules={{
            required: "Please confirm your password",
            validate: (value) =>
              value === watch("password") || "Passwords do not match",
          }}
          render={({ field: { value, onChange, onBlur } }) => (
            <>
              <Input
                backgroundColor="#fff"
                color="#000"
                borderColor="#000"
                placeholderTextColor="#666"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Confirm password"
                secureTextEntry
              />
              {errors.confirmPassword && (
                <Paragraph size="$2" color="$red10">
                  {errors.confirmPassword.message}
                </Paragraph>
              )}
            </>
          )}
        />
      )}

      <Button
        disabled={isAuth}
        onPress={handleSubmit(onSubmit)}
        backgroundColor="$primary"
        borderColor="#000"
        color="#ffffff"
      >
        {type === "sign-up" ? "Sign up" : "Sign in"}
      </Button>

      <XStack>
        <Paragraph size="$2" color="#000" mr="$2">
          {type === "sign-up" ? "Already have an account?" : "No account yet?"}
        </Paragraph>

        <Paragraph
          size="$2"
          fontWeight="700"
          color="#000"
          cursor="pointer"
          onPress={onSwitchMode}
        >
          {type === "sign-up" ? "Sign in" : "Sign up"}
        </Paragraph>
      </XStack>
    </YStack>
  );
};
