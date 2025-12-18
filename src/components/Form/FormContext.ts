import { createContext, useContext } from "react";

export interface FormContextValue {
  layout?: "horizontal" | "vertical" | "inline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

export const FormContext = createContext<FormContextValue>({});

export const useFormContext = () => useContext(FormContext);
