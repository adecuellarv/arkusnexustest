import React, { useState } from 'react';
//import { connect } from 'react-redux';
//import { withRouter } from 'react-router-dom';
import { Modal, Button, Form } from "react-bootstrap";
import { objectAdduser, objArrayUsers } from '../../models/users';
//import { addUser } from '../../actions/users';
import './modal-add.scss';
interface Props {
  show: boolean;
  handleClose: (text: boolean) => void;
  users_list: typeof objArrayUsers;
  addUser: (addUser: typeof objectAdduser, users_list: typeof objArrayUsers) => Promise<void>;
}

const ModalAdd: React.FC<Props> = (props) => {
  const [name, setName] = useState('');
  const [job, setJob] = useState('');
  const clickModal = () => {
    props.handleClose(false);
  };

  const add = () => {
    if (name && job) {
      props.addUser({
        name,
        job
      }, props.users_list);
    }
    props.handleClose(false);
  };

  return (
    <Modal show={props.show} onHide={clickModal} >
      <Modal.Header closeButton>
        <Modal.Title>Agregar usuario</Modal.Title>
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
        <Button variant="primary" onClick={add}>
          Guardar
          </Button>
      </Modal.Footer>
    </Modal>
  );
}
/*
const mapDispatchToProps = {
  addUser
};

const mapStateToProps = (state: { users_list: typeof objArrayUsers }) => ({
  users_list: state.users_list
});


export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ModalAdd)
);*/
export default ModalAdd;
