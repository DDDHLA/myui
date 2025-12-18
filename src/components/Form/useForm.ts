import { useState, useCallback, ChangeEvent } from "react";

export interface FieldData {
  value: any;
  error?: string;
  touched?: boolean;
}

export interface FormValues {
  [key: string]: any;
}

export interface FormErrors {
  [key: string]: string;
}

export interface ValidationRule {
  required?: boolean | string;
  min?: number | { value: number; message: string };
  max?: number | { value: number; message: string };
  minLength?: number | { value: number; message: string };
  maxLength?: number | { value: number; message: string };
  pattern?: RegExp | { value: RegExp; message: string };
  validator?: (
    value: any,
    values: FormValues
  ) => string | undefined | Promise<string | undefined>;
}

export interface FieldConfig {
  initialValue?: any;
  rules?: ValidationRule[];
}

export interface UseFormOptions {
  initialValues?: FormValues;
  onSubmit?: (values: FormValues) => void | Promise<void>;
  onValuesChange?: (changedValues: FormValues, allValues: FormValues) => void;
}

export const useForm = (options: UseFormOptions = {}) => {
  const { initialValues = {}, onSubmit, onValuesChange } = options;

  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [submitting, setSubmitting] = useState(false);

  // 验证单个字段
  const validateField = useCallback(
    async (
      name: string,
      value: any,
      rules?: ValidationRule[]
    ): Promise<string | undefined> => {
      if (!rules || rules.length === 0) return undefined;

      for (const rule of rules) {
        // Required validation
        if (rule.required) {
          const isEmpty = value === undefined || value === null || value === "";
          if (isEmpty) {
            return typeof rule.required === "string"
              ? rule.required
              : `${name} is required`;
          }
        }

        // Min validation
        if (rule.min !== undefined) {
          const min = typeof rule.min === "number" ? rule.min : rule.min.value;
          const message =
            typeof rule.min === "object"
              ? rule.min.message
              : `Value must be at least ${min}`;
          if (typeof value === "number" && value < min) {
            return message;
          }
        }

        // Max validation
        if (rule.max !== undefined) {
          const max = typeof rule.max === "number" ? rule.max : rule.max.value;
          const message =
            typeof rule.max === "object"
              ? rule.max.message
              : `Value must be at most ${max}`;
          if (typeof value === "number" && value > max) {
            return message;
          }
        }

        // MinLength validation
        if (rule.minLength !== undefined) {
          const minLength =
            typeof rule.minLength === "number"
              ? rule.minLength
              : rule.minLength.value;
          const message =
            typeof rule.minLength === "object"
              ? rule.minLength.message
              : `Length must be at least ${minLength}`;
          if (typeof value === "string" && value.length < minLength) {
            return message;
          }
        }

        // MaxLength validation
        if (rule.maxLength !== undefined) {
          const maxLength =
            typeof rule.maxLength === "number"
              ? rule.maxLength
              : rule.maxLength.value;
          const message =
            typeof rule.maxLength === "object"
              ? rule.maxLength.message
              : `Length must be at most ${maxLength}`;
          if (typeof value === "string" && value.length > maxLength) {
            return message;
          }
        }

        // Pattern validation
        if (rule.pattern) {
          const pattern =
            rule.pattern instanceof RegExp ? rule.pattern : rule.pattern.value;
          const message =
            rule.pattern instanceof RegExp
              ? "Invalid format"
              : rule.pattern.message;
          if (typeof value === "string" && !pattern.test(value)) {
            return message;
          }
        }

        // Custom validator
        if (rule.validator) {
          const error = await rule.validator(value, values);
          if (error) return error;
        }
      }

      return undefined;
    },
    [values]
  );

  // 设置字段值
  const setFieldValue = useCallback(
    (name: string, value: any) => {
      const newValues = { ...values, [name]: value };
      setValues(newValues);

      if (onValuesChange) {
        onValuesChange({ [name]: value }, newValues);
      }
    },
    [values, onValuesChange]
  );

  // 设置字段错误
  const setFieldError = useCallback(
    (name: string, error: string | undefined) => {
      setErrors((prev) => {
        if (error === undefined) {
          const { [name]: _, ...rest } = prev;
          return rest;
        }
        return { ...prev, [name]: error };
      });
    },
    []
  );

  // 设置字段触摸状态
  const setFieldTouched = useCallback((name: string, isTouched = true) => {
    setTouched((prev) => ({ ...prev, [name]: isTouched }));
  }, []);

  // 获取字段的属性和事件处理器
  const getFieldProps = useCallback(
    (name: string, rules?: ValidationRule[]) => {
      return {
        name,
        value: values[name] ?? "",
        error: touched[name] ? errors[name] : undefined,
        onChange: (
          e: ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
          >
        ) => {
          setFieldValue(name, e.target.value);
        },
        onBlur: async () => {
          setFieldTouched(name, true);
          const error = await validateField(name, values[name], rules);
          setFieldError(name, error);
        },
      };
    },
    [
      values,
      errors,
      touched,
      setFieldValue,
      setFieldTouched,
      validateField,
      setFieldError,
    ]
  );

  // 验证所有字段
  const validateForm = useCallback(
    async (fieldConfigs: { [name: string]: FieldConfig }): Promise<boolean> => {
      const newErrors: FormErrors = {};

      await Promise.all(
        Object.entries(fieldConfigs).map(async ([name, config]) => {
          const error = await validateField(name, values[name], config.rules);
          if (error) {
            newErrors[name] = error;
          }
        })
      );

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    [values, validateField]
  );

  // 提交表单
  const handleSubmit = useCallback(
    (fieldConfigs: { [name: string]: FieldConfig }) => {
      return async (e?: React.FormEvent) => {
        e?.preventDefault();

        setSubmitting(true);
        const isValid = await validateForm(fieldConfigs);

        if (isValid && onSubmit) {
          try {
            await onSubmit(values);
          } catch (error) {
            console.error("Form submission error:", error);
          }
        }

        setSubmitting(false);
      };
    },
    [values, validateForm, onSubmit]
  );

  // 重置表单
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setSubmitting(false);
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    submitting,
    setFieldValue,
    setFieldError,
    setFieldTouched,
    getFieldProps,
    validateForm,
    handleSubmit,
    resetForm,
  };
};

export default useForm;
