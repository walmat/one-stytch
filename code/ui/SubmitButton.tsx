import { useFormState } from "react-hook-form";
import { AnimatePresence, Button, ButtonProps, Spinner } from "tamagui";

// hack to prevent it from breaking on the server
const useIsSubmitting = () => {
  try {
    return useFormState().isSubmitting;
  } catch (error) {
    console.error(error);
    return false;
  }
};
/**
 * created to be used in forms
 * will show loading spinners and disable submission when already submitting
 */
export const SubmitButton = (props: ButtonProps) => {
  const isSubmitting = useIsSubmitting();

  return (
    <Button
      iconAfter={
        <AnimatePresence>
          {isSubmitting && (
            <Spinner
              color="$color"
              key="loading-spinner"
              o={1}
              y={0}
              animation="quick"
              enterStyle={{
                o: 0,
                y: 4,
              }}
              exitStyle={{
                o: 0,
                y: 4,
              }}
            />
          )}
        </AnimatePresence>
      }
      disabled={isSubmitting}
      {...props}
    />
  );
};
