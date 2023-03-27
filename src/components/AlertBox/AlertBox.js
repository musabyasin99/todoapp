import { React } from "react";

import "./alertbox.css";

const AlertBox = ({ alert, message }) => {
  return (
    <div className={alert ? "alertBoxWrap active" : "alertBoxWrap"}>
      <div className="alertBox">
        <span className="message">{message}</span>
      </div>
    </div>
  );
};

AlertBox.defaultProps = {
  message: "Unknown",
};

export default AlertBox;
