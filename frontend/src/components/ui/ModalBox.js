import React from "react";

import { Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";

export const ModalBox = ({ isOpen, toggle, modalTile, action, children }) => {
  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>{modalTile}</ModalHeader>
        <ModalBody>{children}</ModalBody>
        {/* <ModalFooter>
          <Button color="primary" onClick={action}>
            Delete
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter> */}
      </Modal>
    </div>
  );
};
