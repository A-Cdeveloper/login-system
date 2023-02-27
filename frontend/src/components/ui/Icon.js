import React from "react";
import { AiFillEdit, AiFillDelete, AiFillInfoCircle } from "react-icons/ai";

const Icon = ({ btnType, size, children, onClick }) => {
  let icon;
  if (btnType === "edit") {
    icon = <AiFillEdit size={size} onClick={onClick} />;
  }
  if (btnType === "delete") {
    icon = <AiFillDelete size={size} onClick={onClick} />;
  }
  if (btnType === "view") {
    icon = <AiFillInfoCircle size={size} onClick={onClick} />;
  }

  return (
    <>
      {icon}
      {children}
    </>
  );
};

export default Icon;
