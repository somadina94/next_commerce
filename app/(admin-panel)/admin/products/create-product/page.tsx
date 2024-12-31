"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import useInput from "@/hooks/userInput";
import { AiOutlineProduct } from "react-icons/ai";
import { CiText } from "react-icons/ci";
import { MdAttachMoney } from "react-icons/md";
import { IoMdPhotos } from "react-icons/io";

import classes from "./page.module.css";
import Spinner from "@/components/UI/spinner";
import Alert from "@/components/alerts/auth-alert";
import { createProduct } from "@/lib/actions";

export default function CreateProduct() {
  const [alertMsg, setAlertMsg] = useState<string>("");
  const [alertStatus, setAlertStatus] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showSpinner, setShowSpinner] = useState<boolean>(false);
  const [overviewPhoto, setOverviewPhoto] = useState<File | null>(null);
  const [galleryPhotos, setGalleryPhotos] = useState<FileList | null>(null);
  const {
    value: nameInput,
    enteredValueIsValid: nameInputIsValid,
    hasError: nameInputIsInvalid,
    valueInputChangedHandler: nameInputChangedHandler,
    valueInputBlurHandler: nameInputBlurHandler,
    // reset: nameInputReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: priceInput,
    enteredValueIsValid: priceInputIsValid,
    hasError: priceInputIsInvalid,
    valueInputChangedHandler: priceInputChangedHandler,
    valueInputBlurHandler: priceInputBlurHandler,
    // reset: priceInputReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: shortDescriptionInput,
    enteredValueIsValid: shortDescriptionInputIsValid,
    hasError: shortDescriptionInputIsInvalid,
    valueInputChangedHandler: shortDescriptionInputChangedHandler,
    valueInputBlurHandler: shortDescriptionInputBlurHandler,
    // reset: shortDescriptionInputReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: longDescriptionInput,
    enteredValueIsValid: longDescriptionInputIsValid,
    hasError: longDescriptionInputIsInvalid,
    valueInputChangedHandler: longDescriptionInputChangedHandler,
    valueInputBlurHandler: longDescriptionInputBlurHandler,
    // reset: longDescriptionInputReset,
  } = useInput((value) => value.trim() !== "");

  const overviewHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setOverviewPhoto(file);
  };

  const galleryHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? e.target.files : null;
    setGalleryPhotos(files);
  };

  let formIsValid = false;
  if (
    nameInputIsValid &&
    priceInputIsValid &&
    shortDescriptionInputIsValid &&
    longDescriptionInputIsValid &&
    overviewPhoto &&
    galleryPhotos
  ) {
    formIsValid = true;
  }

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowSpinner(true);

    const form = new FormData();
    form.append("name", nameInput);
    form.append("price", priceInput);
    form.append("shortDescription", shortDescriptionInput);
    form.append("longDescription", longDescriptionInput);
    form.append("overviewPhoto", overviewPhoto!);
    Array.from(galleryPhotos!).forEach((photo) =>
      form.append("galleryPhotos", photo)
    );

    const res = await createProduct(form);

    if (res) {
      setAlertMsg("Product created successfully");
      setAlertStatus(true);
      setShowAlert(true);
    } else {
      setAlertMsg("Error creating product");
      setAlertStatus(false);
      setShowAlert(true);
    }

    setTimeout(() => {
      setShowAlert(false);
      setShowSpinner(false);
    }, 4000);
  };

  const nameInputClasses = nameInputIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;

  const priceInputClasses = priceInputIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;

  const shortDescriptionInputClasses = shortDescriptionInputIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;

  const longDescriptionInputClasses = longDescriptionInputIsInvalid
    ? `${classes.group} ${classes.invalid}`
    : classes.group;

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      {showSpinner && <Spinner />}
      {showAlert && <Alert message={alertMsg} status={alertStatus} />}
      <h2>Create a product</h2>
      <div className={nameInputClasses}>
        <label htmlFor="name">Product name</label>
        <div className={classes["input-group"]}>
          <AiOutlineProduct className={classes.icon} />
          <input
            type="text"
            value={nameInput}
            onChange={nameInputChangedHandler}
            onBlur={nameInputBlurHandler}
            id="name"
          />
        </div>
        {nameInputIsInvalid && <span>Please enter a product name.</span>}
      </div>
      <div className={priceInputClasses}>
        <label htmlFor="price">Product price</label>
        <div className={classes["input-group"]}>
          <MdAttachMoney className={classes.icon} />
          <input
            type="number"
            value={priceInput}
            onChange={priceInputChangedHandler}
            onBlur={priceInputBlurHandler}
            id="price"
          />
        </div>
        {priceInputIsInvalid && <span>Please enter a product price.</span>}
      </div>
      <div className={shortDescriptionInputClasses}>
        <label htmlFor="shortDescription">Product short description</label>
        <div className={classes["input-group"]}>
          <CiText className={classes.icon} />
          <input
            type="text"
            value={shortDescriptionInput}
            onChange={shortDescriptionInputChangedHandler}
            onBlur={shortDescriptionInputBlurHandler}
            id="shortDescription"
          />
        </div>
        {shortDescriptionInputIsInvalid && (
          <span>Please enter a product short description.</span>
        )}
      </div>
      <div className={longDescriptionInputClasses}>
        <label htmlFor="longDescription">Product short description</label>
        <div className={classes["input-group"]}>
          <CiText className={classes.icon} />
          <textarea
            value={longDescriptionInput}
            onChange={longDescriptionInputChangedHandler}
            onBlur={longDescriptionInputBlurHandler}
            id="longDescription"
          />
        </div>
        {longDescriptionInputIsInvalid && (
          <span>Please enter a product long description.</span>
        )}
      </div>
      <div className={classes.group}>
        <label htmlFor="overviewPhoto">Product overview photo(1)</label>
        <div className={classes["input-group"]}>
          <IoMdPhotos className={classes.icon} />
          <input type="file" onChange={overviewHandler} id="overviewPhoto" />
        </div>
      </div>
      <div className={classes.group}>
        <label htmlFor="galleryPhotos">Product gallery photos(multiple)</label>
        <div className={classes["input-group"]}>
          <IoMdPhotos className={classes.icon} />
          <input
            type="file"
            onChange={galleryHandler}
            id="galleryPhotos"
            multiple
          />
        </div>
      </div>
      <div className={classes.action}>
        <button disabled={!formIsValid}>Create product</button>
      </div>
    </form>
  );
}
