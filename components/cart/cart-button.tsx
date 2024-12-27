import { FaCartPlus } from "react-icons/fa";

import classes from "./cart-button.module.css";

export default function CartButton() {
  return (
    <div className={classes.cartBtn}>
      <FaCartPlus className={classes.icon} />
      <p className={classes.items}>2</p>
    </div>
  );
}
