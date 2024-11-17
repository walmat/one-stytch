import { useStringFieldInfo, useTsController } from "@ts-react/form";
import { useId } from "react";
import { Fieldset, Input, InputProps, Label, Theme } from "tamagui";

import { FieldError } from "~/code/ui/FormFields/FieldError";
import { Shake } from "~/code/ui/Shake";

export const TextField = (
  props: Pick<InputProps, "size" | "autoFocus" | "secureTextEntry">
) => {
  const {
    field,
    error,
    formState: { isSubmitting },
  } = useTsController<string>();
  const { label, placeholder, isOptional, maxLength, isEmail } =
    useStringFieldInfo();
  const id = useId();
  const disabled = isSubmitting;

  return (
    <Theme name={error ? "red" : null} forceClassName>
      <Fieldset>
        {!!label && (
          <Label theme="alt1" size={props.size || "$3"} htmlFor={id}>
            {label} {isOptional && `(Optional)`}
          </Label>
        )}
        <Shake shakeKey={error?.errorMessage}>
          <Input
            disabled={disabled}
            maxLength={maxLength}
            placeholderTextColor="$color10"
            spellCheck={isEmail ? false : undefined}
            autoCapitalize={isEmail ? "none" : undefined}
            inputMode={isEmail ? "email" : undefined}
            value={field.value}
            onChangeText={(text) => field.onChange(text)}
            onBlur={field.onBlur}
            ref={field.ref}
            placeholder={placeholder}
            id={id}
            {...props}
          />
        </Shake>
        <FieldError message={error?.errorMessage} />
      </Fieldset>
    </Theme>
  );
};
