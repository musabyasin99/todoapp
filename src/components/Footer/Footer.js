import React from "react";

import "./footer.css";

const Footer = () => {
  const date = new Date();
  return (
    <footer>
      All rights reserved under Copyright &nbsp;
      <small style={{ marginBottom: "5px" }}> &copy; </small>
      &nbsp;
      {date.getFullYear()}
    </footer>
  );
};

export default Footer;
