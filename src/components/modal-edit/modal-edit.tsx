import React from 'react';
import { Modal, Button } from "react-bootstrap";

interface Props {
  show: boolean;
  handleClose: (text: boolean) => void;
}

const clickModal = () => {
  console.log('click');
};

const ModalEdit: React.FC<Props> = (props) => { console.log(props);
  return (
    <Modal show={props.show} onHide={clickModal}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={clickModal}>
          Close
          </Button>
        <Button variant="primary" onClick={clickModal}>
          Save Changes
          </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalEdit;
