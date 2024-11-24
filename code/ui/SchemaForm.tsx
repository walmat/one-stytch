import {
  AddressField,
  AddressSchema,
  BooleanCheckboxField,
  BooleanField,
  BooleanSwitchField,
  FieldError,
  FormWrapper,
  NumberField,
  SelectField,
  TextAreaField,
  TextField,
  DateField,
  DateSchema,
} from "~/code/ui/FormFields";
import { Form, Theme, type FormProps } from "tamagui";
import { createTsForm, createUniqueFieldSchema } from "@ts-react/form";
import type { ComponentProps } from "react";
import { useFormContext } from "react-hook-form";
import { z } from "zod";

export const formFields = {
  text: z.string(),
  textarea: createUniqueFieldSchema(z.string(), "textarea"),
  /**
   * input that takes number
   */
  number: z.number(),
  /**
   * adapts to native switch on native, and native checkbox on web
   */
  boolean: z.boolean(),
  /**
   * switch field on all platforms
   */
  boolean_switch: createUniqueFieldSchema(z.boolean(), "boolean_switch"),
  /**
   * checkbox field on all platforms
   */
  boolean_checkbox: createUniqueFieldSchema(z.boolean(), "boolean_checkbox"),
  /**
   * make sure to pass options={} to props for this
   */
  select: createUniqueFieldSchema(z.string(), "select"),
  /**
   * example of how to handle more complex fields
   */
  address: createUniqueFieldSchema(AddressSchema, "address"),
  date: createUniqueFieldSchema(DateSchema, "date"),
};

// function createFormSchema<T extends ZodRawShape>(getData: (fields: typeof formFields) => T) {
//   return z.object(getData(formFields))
// }

const mapping = [
  [formFields.text, TextField] as const,
  [formFields.textarea, TextAreaField] as const,
  [formFields.number, NumberField] as const,
  [formFields.boolean, BooleanField] as const,
  [formFields.boolean_switch, BooleanSwitchField] as const,
  [formFields.boolean_checkbox, BooleanCheckboxField] as const,
  [formFields.select, SelectField] as const,
  [formFields.address, AddressField] as const,
  [formFields.date, DateField] as const,
] as const;

const FormComponent = (props: FormProps) => {
  return (
    <Form asChild {...props} minWidth="100%">
      <FormWrapper tag="form">{props.children}</FormWrapper>
    </Form>
  );
};

const _SchemaForm = createTsForm(mapping, {
  FormComponent,
});

// SchemaForm is a higher-order component that wraps around the _SchemaForm component.
// It provides additional functionality for rendering a form with custom fields and a footer.
// The renderAfter prop allows for custom content to be rendered in the form's footer.
// The children prop can be used to customize the rendering of form fields.
export const SchemaForm: typeof _SchemaForm = ({ ...props }) => {
  const renderAfter: ComponentProps<typeof _SchemaForm>["renderAfter"] =
    props.renderAfter
      ? (vars) => (
          <FormWrapper.Footer>{props.renderAfter?.(vars)}</FormWrapper.Footer>
        )
      : undefined;

  return (
    <_SchemaForm {...props} renderAfter={renderAfter}>
      {(fields, context) => (
        <FormWrapper.Body minWidth="100%" $platform-native={{ miw: "100%" }}>
          {props.children
            ? props.children(fields, context)
            : Object.entries(fields)
                .filter(([key]) => {
                  // Get the original schema definition
                  const schema = (props.schema as any)._def.schema?._def;
                  // Get the shape from the schema
                  const shape = schema?.shape;
                  if (!shape) return true;
                  // Check if the field's schema is an enum
                  return !(shape[key]?._def?.typeName === "ZodEnum");
                })
                .map(([_, field]) => field)}
        </FormWrapper.Body>
      )}
    </_SchemaForm>
  );
};

// handle manual errors (most commonly coming from a server) for cases where it's not for a specific field - make sure to wrap inside a provider first
// stopped using it cause of state issues it introduced - set the errors to specific fields instead of root for now
export const RootError = () => {
  const context = useFormContext();
  const errorMessage = context?.formState?.errors?.root?.message;

  return (
    <Theme name="red">
      <FieldError message={errorMessage} />
    </Theme>
  );
};
