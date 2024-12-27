import classes from "./auth-alert.module.css";

interface AlertProps {
  message: string;
  status: boolean;
}

export default function Alert(props: AlertProps) {
  const { message, status } = props;

  const alertClasses = status
    ? `${classes.alert} ${classes.success}`
    : `${classes.alert} ${classes.error}`;

  return <p className={alertClasses}>{message}</p>;
}
