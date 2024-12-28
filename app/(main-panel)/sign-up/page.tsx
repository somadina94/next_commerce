"use client";
import { useState } from "react";
import useInput from "@/hooks/userInput";
import { BsFillEnvelopeAtFill, BsKeyFill } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { FaGithubSquare } from "react-icons/fa";
import { useRouter } from "next/navigation";

import classes from "./page.module.css";
import { signUp } from "@/http/http";
import { signIn } from "next-auth/react";
import Alert from "@/components/alerts/auth-alert";
import Spinner from "@/components/UI/spinner";

export default function SignUp() {
  const router = useRouter();
  const [alertMsg, setAlertMsg] = useState<string>("");
  const [alertStatus, setAlertStatus] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showSpinner, setShowSpinner] = useState<boolean>(false);
  const {
    value: nameInput,
    enteredValueIsValid: nameInputIsValid,
    hasError: nameInputIsInvalid,
    valueInputChangedHandler: nameInputChangedHandler,
    valueInputBlurHandler: nameInputBlurHandler,
    reset: nameInputReset,
  } = useInput((value) => value.trim() !== "");
  const {
    value: emailInput,
    enteredValueIsValid: emailInputIsValid,
    hasError: emailInputIsInvalid,
    valueInputChangedHandler: emailInputChangedHandler,
    valueInputBlurHandler: emailInputBlurHandler,
    reset: emailInputReset,
  } = useInput((value) => value.trim().includes("@"));

  const {
    value: passwordInput,
    enteredValueIsValid: passwordInputIsValid,
    hasError: passwordInputIsInvalid,
    valueInputChangedHandler: passwordInputChangedHandler,
    valueInputBlurHandler: passwordInputBlurHandler,
    reset: passwordInputReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: confirmPasswordInput,
    enteredValueIsValid: confirmPasswordInputIsValid,
    hasError: confirmPasswordInputIsInvalid,
    valueInputChangedHandler: confirmPasswordInputChangedHandler,
    valueInputBlurHandler: confirmPasswordInputBlurHandler,
    reset: confirmPasswordInputReset,
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;

  if (
    nameInputIsValid &&
    emailInputIsValid &&
    passwordInputIsValid &&
    confirmPasswordInputIsValid
  ) {
    formIsValid = true;
  }

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowSpinner(true);

    const data = {
      name: nameInput,
      email: emailInput,
      password: passwordInput,
      passwordConfirm: confirmPasswordInput,
    };

    const res = await signUp(data);
    if (res.status === 201) {
      setShowSpinner(false);
      setAlertMsg(res.data.message);
      setAlertStatus(true);
      setShowAlert(true);
      router.push("/sign-in");
    } else {
      setAlertMsg(res.data.message);
      setAlertStatus(false);
      setShowAlert(true);
      setShowSpinner(false);
    }

    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
    nameInputReset();
    emailInputReset();
    passwordInputReset();
    confirmPasswordInputReset();
  };

  const handleProvider = async (
    e: React.MouseEvent,
    value: "github" | "google"
  ) => {
    e.preventDefault();
    setShowSpinner(true);
    await signIn(value, { callbackUrl: "/" });
    setShowSpinner(false);
    setAlertMsg("successfully signed in.");
    setAlertStatus(true);
    setShowAlert(true);
  };

  const emailInputClasses = emailInputIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;

  const nameInputClasses = nameInputIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;

  const passwordInputClasses = passwordInputIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;

  const confirmPasswordInputClasses = confirmPasswordInputIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;

  return (
    <section className={classes.signup}>
      {showSpinner && <Spinner />}
      {showAlert && <Alert message={alertMsg} status={alertStatus} />}
      <h2>Sign up to purchase some of your favorite products</h2>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={nameInputClasses}>
          <label htmlFor="name">Fullname</label>
          <div className={classes["input-group"]}>
            <BsFillEnvelopeAtFill className={classes.icon} />
            <input
              type="text"
              value={nameInput}
              onChange={nameInputChangedHandler}
              onBlur={nameInputBlurHandler}
              id="label"
            />
          </div>
          {nameInputIsInvalid && <span>Please enter your fullname.</span>}
        </div>
        <div className={emailInputClasses}>
          <label htmlFor="email">Email address</label>
          <div className={classes["input-group"]}>
            <BsFillEnvelopeAtFill className={classes.icon} />
            <input
              type="email"
              value={emailInput}
              onChange={emailInputChangedHandler}
              onBlur={emailInputBlurHandler}
              id="email"
            />
          </div>
          {emailInputIsInvalid && <span>Please enter your valid email.</span>}
        </div>
        <div className={passwordInputClasses}>
          <label htmlFor="password">Password</label>
          <div className={classes["input-group"]}>
            <BsKeyFill className={classes.icon} />
            <input
              type="password"
              value={passwordInput}
              onChange={passwordInputChangedHandler}
              onBlur={passwordInputBlurHandler}
              id="password"
            />
          </div>
          {passwordInputIsInvalid && <span>Please choose a password</span>}
        </div>
        <div className={confirmPasswordInputClasses}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className={classes["input-group"]}>
            <BsKeyFill className={classes.icon} />
            <input
              type="password"
              value={confirmPasswordInput}
              onChange={confirmPasswordInputChangedHandler}
              onBlur={confirmPasswordInputBlurHandler}
              id="confirmPassword"
            />
          </div>
          {confirmPasswordInputIsInvalid && (
            <span>Please confirm your password</span>
          )}
        </div>
        <div className={classes.action}>
          <button type="submit" disabled={!formIsValid}>
            Continue
          </button>
        </div>
        <div className={classes.services}>
          <button
            className={classes.google}
            onClick={(e) => handleProvider(e, "google")}
          >
            <span>Continue with</span>
            <FcGoogle className={classes.icon} />
          </button>
          <button
            className={classes.google}
            onClick={(e) => handleProvider(e, "google")}
          >
            <span>Continue with</span>
            <FaGithubSquare className={classes.icon} />
          </button>
        </div>
      </form>
    </section>
  );
}
