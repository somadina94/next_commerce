"use client";
import { useState } from "react";
import { deleteUser } from "@/lib/actions";
import classes from "./user-item.module.css";
import Spinner from "../UI/spinner";
import Alert from "../alerts/auth-alert";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function UserItem({ user }: { user: User }) {
  const [alertMsg, setAlertMsg] = useState<string>("");
  const [alertStatus, setAlertStatus] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showSpinner, setShowSpinner] = useState<boolean>(false);
  const deleteHandler = async () => {
    setShowSpinner(true);

    const res = await deleteUser(user.id);

    if (res) {
      setAlertMsg(`${user.name} deleted successfully.`);
      setAlertStatus(true);
      setShowAlert(true);
    } else {
      setAlertMsg("Error deleting user");
      setAlertStatus(false);
      setShowAlert(true);
    }

    setTimeout(() => {
      setShowSpinner(false);
      setShowAlert(false);
    }, 4000);
  };
  return (
    <div className={classes.user}>
      {showSpinner && <Spinner />}
      {showAlert && <Alert message={alertMsg} status={alertStatus} />}
      <div className={classes.content}>
        <span>Id</span>
        <span>{user.id}</span>
      </div>
      <div className={classes.content}>
        <span>Name</span>
        <span>{user.name}</span>
      </div>
      <div className={classes.content}>
        <span>Email</span>
        <span>{user.email}</span>
      </div>
      <div className={classes.content}>
        <span>Role</span>
        <span>{user.role}</span>
      </div>
      <div className={classes.actions}>
        <button onClick={deleteHandler}>Delete</button>
      </div>
    </div>
  );
}
