import { SubmitButton } from "~/code/ui/SubmitButton";
import { SchemaForm, formFields } from "~/code/ui/SchemaForm";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { YStack, Theme, Paragraph, H2 } from "tamagui";
import { useSession } from "~/code/auth/session";

// TODO: Finish this
/**
 * 1. Show email when on the code step
 * 2. add way to get back to email step from code step
 */

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

  const form = useForm<z.infer<typeof SignInSchema>>();

  async function handleSubmit({
    methodId,
    email,
    code,
  }: z.infer<typeof SignInSchema>) {
    if (!methodId) {
      const lowercaseEmail = email.toLowerCase();
      const { methodId: newMethodId, statusCode } = await sendCode({
        email: lowercaseEmail,
      });

      if (statusCode !== 200) {
        // TODO: Add proper toast error handling
      }

      // NOTE: this is a workaround to the form to not be stuck in isSubmitting while waiting for the code to be given
      form.setValue("methodId", newMethodId);
      form.formState.isSubmitting = false;
      form.trigger();
    } else {
      const { success } = await loginWithCode({ methodId, code });
      if (success) {
        form.reset();
        return;
      }

      // TODO: Add proper toast error handling
      form.setError("code", { type: "custom", message: "Unable to login" });
    }
  }

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
          return (
            <>
              <Theme inverse>
                <SubmitButton onPress={submit} br="$10">
                  Sign In
                </SubmitButton>
              </Theme>
            </>
          );
        }}
      >
        {({ code, email }) => {
          const methodId = form.watch("methodId");
          return (
            <>
              <YStack gap="$3" mb="$4">
                <H2 $sm={{ size: "$8" }}>Welcome Back</H2>
                <Paragraph theme="alt1">
                  {!methodId
                    ? "Sign in to your account"
                    : `Enter the code you received`}
                </Paragraph>
              </YStack>
              {!methodId && email}
              {!!methodId && code}
            </>
          );
        }}
      </SchemaForm>
    </FormProvider>
  );
};
