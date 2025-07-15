import { type ReactNode, type CSSProperties, useEffect, memo, type JSX } from "react";
import { useForm, type SubmitHandler, type FieldValues, FormProvider } from "react-hook-form";
import { Button } from "..";

interface CustomFormProps<T extends FieldValues> {
  children: ReactNode;
  submitButton?: ReactNode;
  style?: CSSProperties;
  submitText?: string;
  onSubmitForm?: (data: T) => Promise<any>;
  showSubmitButton?: boolean;
  buttonStyles?: CSSProperties;
  defaultValues: T;
  isLoading?: boolean;
}

const CustomFormComponent = <T extends FieldValues>({
  children,
  submitButton,
  style,
  submitText,
  onSubmitForm,
  showSubmitButton = true,
  buttonStyles,
  defaultValues,
  isLoading,
}: CustomFormProps<T>) => {
  const methods = useForm<T>();

  useEffect(() => {
    if (defaultValues) {
      methods.reset(defaultValues);
    }
  }, [defaultValues]);

  const onSubmit: SubmitHandler<T> = (data) => {
    onSubmitForm && onSubmitForm(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} style={style}>
        {children}
        {showSubmitButton &&
          (submitButton ? (
            submitButton
          ) : (
            <Button
              style={{ marginTop: 2, marginBottom: 2, ...buttonStyles }}
              htmlType="submit"
              title={submitText || "Guardar"}
              onClick={() => {}}
              loading={isLoading}
            />
          ))}
      </form>
    </FormProvider>
  );
};

// Memoize the component and handle TypeScript generics
export const CustomForm = memo(CustomFormComponent) as <T extends FieldValues>(
  props: CustomFormProps<T>,
) => JSX.Element;
