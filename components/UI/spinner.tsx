import classes from "./spinner.module.css";

import { Spinner as Spin } from "react-bootstrap";

export default function Spinner() {
  return (
    <div className={classes.backdrop}>
      <Spin
        animation="border"
        size="sm"
        variant="primary"
        style={{ width: "6rem", height: "6rem" }}
        className={classes.spinner}
      />
    </div>
  );
}
