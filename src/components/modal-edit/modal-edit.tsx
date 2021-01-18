import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from "react-bootstrap";
import { objectUser, objectAdduser, objArrayUsers } from '../../models/users';

interface Props {
  show: boolean;
  handleClose: (text: boolean) => void;
  users_list: typeof objArrayUsers;
  infoUserToEdit: typeof objectUser;
  updateUser: (updateUser: typeof objectAdduser, users_list: typeof objArrayUsers, userid: number) => Promise<void>;
}

const ModalEdit: React.FC<Props> = (props) => {
  const [name, setName] = useState('');
  const [job, setJob] = useState('default');

  useEffect(
    () => {
      setName(props.infoUserToEdit.first_name);
    }, [props.infoUserToEdit.first_name]
  );
  const clickModal = () => {
    props.handleClose(false);
  };

  const update = () => {
    if (name && job) {
      props.updateUser({
        name,
        job
      }, props.users_list, props.infoUserToEdit.id);

      setName('');
      setJob('default');
      props.handleClose(false);
    }
  };

  return (
    <Modal show={props.show} onHide={clickModal} >
      <Modal.Header closeButton>
        <Modal.Title>Actualizar usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <div className="contet-input">
            <label className="label-form">Nombre</label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />
          </div>
          <div className="contet-input">
            <label className="label-form">Puesto</label>
            <Form.Control
              type="text"
              value={job}
              onChange={(e) => setJob(e.currentTarget.value)} />
          </div>
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <label className="cancel-modal" onClick={clickModal}>
          Cancelar
          </label>
        <Button variant="primary" onClick={update}>
          Actualizar
          </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalEdit;
