import React from 'react';
import {
  Controller,
  ControllerProps,
  FieldError,
  FieldValues,
  Path,
} from 'react-hook-form';

import TextField from '../TextField';

interface FormFieldProps<T> extends Partial<ControllerProps<T>> {
  hiddenLabel?: boolean;
  label?: string;
  placeholder?: string;
  name: Path<T>;
  type?: string;
  error?: FieldError | null;
  maxLength?: number;
  multiline?: boolean;
  rows?: number;
}

const FormField = <T extends FieldValues>({
  name,
  type,
  control,
  label,
  error,
  maxLength,
  rows,
  placeholder,
  multiline,
  hiddenLabel,
}: FormFieldProps<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { onChange, value } }) => (
      <TextField
        label={label}
        placeholder={placeholder}
        {...(hiddenLabel && { hiddenLabel: true })}
        {...(multiline && { multiline: true })}
        {...(rows && { rows })}
        {...(maxLength && { maxLength })}
        onChange={onChange}
        value={value}
        type={type}
        hookFormError={error}
      />
    )}
  />
);

export default FormField;
