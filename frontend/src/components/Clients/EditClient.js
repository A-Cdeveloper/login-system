import React, { useState } from "react";
import { ModalBox } from "../ui/ModalBox";

const EditClient = ({ edit, close }) => {
  const [isOpenModal, setIsOpenModal] = useState(edit);

  console.log("EDIT");

  const toggle = () => {
    setIsOpenModal(!isOpenModal);
    close();
  };

  return (
    <ModalBox isOpen={isOpenModal} toggle={toggle} modalTile="Edit client">
      EditClient lorem ipsum
    </ModalBox>
  );
};

export default EditClient;
