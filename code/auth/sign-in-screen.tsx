import { SubmitButton } from "~/code/ui/SubmitButton";
import { SchemaForm, formFields } from "~/code/ui/SchemaForm";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { YStack, Theme, Paragraph, H2 } from "tamagui";
import { useRouter } from "one";
import { useSession } from "~/code/store/session";

const SignInSchema = z
  .object({
    methodId: formFields.text.optional(),
    email: formFields.text.email().describe("Email // Enter your email"),
    code: formFields.text.describe("Code // Enter the code you received"),
  })
  .refine(
    (data) => {
      console.log("data", data);
      if (data.methodId && !data.code) {
        return false;
      }
      return true;
    },
    {
      message: "Code // Enter the code you received",
      path: ["code"],
    }
  );

export const SignInScreen = () => {
  const { sendCode, loginWithCode } = useSession();
  const router = useRouter();

  const form = useForm<z.infer<typeof SignInSchema>>();

  async function handleSubmit({
    methodId,
    email,
    code,
  }: z.infer<typeof SignInSchema>) {
    if (!methodId) {
      const { methodId: newMethodId, statusCode } = await sendCode({
        email: email.toLowerCase(),
      });
      if (statusCode === 200) {
        form.setValue("methodId", newMethodId);
      }
    } else {
      if (!code) return;
      const { success } = await loginWithCode({ methodId, code });
      if (success) {
        form.reset();
        router.replace("/(tabs)");
        return;
      }

      form.setError("code", { type: "custom", message: "Unable to login" });
    }
  }

  const methodId = form.watch("methodId");

  return (
    <FormProvider {...form}>
      <SchemaForm
        form={form}
        schema={SignInSchema}
        defaultValues={{
          methodId: "",
          email: "",
          code: "",
        }}
        onSubmit={handleSubmit}
        renderAfter={({ submit }) => {
          const onPress = () => {
            console.log("here");
            submit();
          };

          return (
            <>
              <Theme inverse>
                <SubmitButton onPress={onPress} br="$10">
                  Sign In
                </SubmitButton>
              </Theme>
            </>
          );
        }}
      >
        {({ code, email }) => (
          <>
            <YStack gap="$3" mb="$4">
              <H2 $sm={{ size: "$8" }}>Welcome Back</H2>
              <Paragraph theme="alt1">Sign in to your account</Paragraph>
            </YStack>
            {!methodId && email}
            {!!methodId && code}
          </>
        )}
      </SchemaForm>
    </FormProvider>
  );
};
