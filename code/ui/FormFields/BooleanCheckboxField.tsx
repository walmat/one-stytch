import { Check } from "@tamagui/lucide-icons";
import { useFieldInfo, useTsController } from "@ts-react/form";
import { useId } from "react";
import {
  Checkbox,
  CheckboxProps,
  CheckedState,
  Fieldset,
  Label,
  Theme,
  XStack,
} from "tamagui";

import { FieldError } from "~/code/ui/FormFields/FieldError";

export const BooleanCheckboxField = (
  props: Pick<CheckboxProps, "size" | "native">
) => {
  const {
    field,
    error,
    formState: { isSubmitting },
  } = useTsController<CheckedState>();
  const { label, isOptional } = useFieldInfo();
  const id = useId();
  const disabled = isSubmitting;

  return (
    <Theme name={error ? "red" : null} forceClassName>
      <Fieldset>
        <XStack gap="$4">
          {!!label && (
            <Label theme="alt1" size={props.size || "$3"} htmlFor={id}>
              {label} {isOptional && `(Optional)`}
            </Label>
          )}
          <Checkbox
            disabled={disabled}
            native
            checked={field.value}
            onCheckedChange={(checked) => field.onChange(checked)}
            ref={field.ref}
            id={id}
            {...props}
          >
            <Checkbox.Indicator>
              <Check />
            </Checkbox.Indicator>
          </Checkbox>
        </XStack>
        <FieldError message={error?.errorMessage} />
      </Fieldset>
    </Theme>
  );
};
