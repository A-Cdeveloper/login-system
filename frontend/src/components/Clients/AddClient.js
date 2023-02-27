import React, { useState } from "react";
import { ModalBox } from "../ui/ModalBox";

const AddClient = ({ add, close }) => {
  const [isOpenModal, setIsOpenModal] = useState(add);

  const toggle = () => {
    setIsOpenModal(!isOpenModal);
    close();
  };

  return (
    <ModalBox isOpen={isOpenModal} toggle={toggle} modalTile="Add new client">
      AddClient lorem ipsum
    </ModalBox>
  );
};

export default AddClient;
