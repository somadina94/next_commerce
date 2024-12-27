import { useState, ChangeEvent } from "react";

const useInput = (validateValue: (value: string) => boolean) => {
  const [enteredValue, setEnteredValue] = useState<string>("");
  const [isTouched, setIsTouched] = useState<boolean>(false);

  const enteredValueIsValid = validateValue(enteredValue);
  const enteredValueIsInvalid = !enteredValueIsValid && isTouched;

  const valueInputChangedHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEnteredValue(event.target.value);
  };

  const valueInputBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    hasError: enteredValueIsInvalid,
    enteredValueIsValid,
    valueInputChangedHandler,
    valueInputBlurHandler,
    reset,
  };
};

export default useInput;
