import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import cloneDeep from 'lodash/cloneDeep';
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import ModalAdd from '../modal-add';
import ModalEdit from '../modal-edit';
import { getUsers, addUser, updateUser } from '../../actions/users';
import { objArrayUsers, objectAdduser } from '../../models/users';
import './users-list.scss';

interface Props {
  users_list: typeof objArrayUsers;
  getUsers: (getUsers: number) => Promise<void>;
  addUser: (addUser: typeof objectAdduser, users_list: typeof objArrayUsers) => Promise<void>;
  updateUser: (addUser: typeof objectAdduser, users_list: typeof objArrayUsers, userid: number) => Promise<void>;
}

const UsersList: React.FC<Props> = (props) => {
  const [list, setList] = useState(props.users_list);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [infoUserToEdit, setInfoUserToEdit] = useState({
    id: 0,
    email: '',
    first_name: '',
    last_name: '',
    avatar: ''
  });
  useEffect(
    () => {
      loadUsers();
    }, []
  );

  useEffect(
    () => {
      setList(props.users_list);
    }, [props.users_list]
  );

  const loadUsers = async () => {
    if (isEmpty(props.users_list)) await props.getUsers(1);
  };

  const openModalEdit = (userid: number) => {
    setInfoUserToEdit(props.users_list.filter(result => result.id === userid)[0]);
    setShowEdit(true);
  };

  const deleteElement = (userid: number) => {
    const arrayClone = cloneDeep(list);
    const indexDelete = arrayClone.findIndex(
			interest => interest.id === userid
    );
    const newArray = [];
		for (let index = 0; index < arrayClone.length; index++) {
      if(index !== indexDelete){
        const element = arrayClone[index];
        newArray.push(element);
      }
    }
    setList(newArray);
  };

  return (
    <div className="principal">
      <Container>
        <h1>Arkus APP</h1>
        <Row>
          {!isEmpty(list) && list.map(function (user, key) {
            return (
              <Col xs={12} md={6} lg={4} key={key}>
                <div className="card" >
                  <div>
                    <Link to={`/user/${user.id}`}><img src={user.avatar} alt="avatar" /></Link>
                    <div className="user-info">
                      <Link to={`/user/${user.id}`}><h5>{user.first_name} {user.last_name}</h5></Link>
                      <p>{user.email}</p>
                      <div>
                        <label onClick={() => openModalEdit(user.id)}><FontAwesomeIcon icon={faPencilAlt} /></label>
                        <label onClick={() => deleteElement(user.id)}><FontAwesomeIcon icon={faTimes} /></label>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>
      <div>
        <button className="btn-add" onClick={() => setShowAdd(true)}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <ModalAdd
          show={showAdd}
          handleClose={() => setShowAdd(false)}
          users_list={props.users_list}
          addUser={props.addUser}
        />
        <ModalEdit
          show={showEdit}
          handleClose={() => setShowEdit(false)}
          users_list={props.users_list}
          infoUserToEdit={infoUserToEdit}
          updateUser={props.updateUser}
        />
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  getUsers,
  addUser,
  updateUser
};

const mapStateToProps = (state: { users_list: typeof objArrayUsers }) => ({
  users_list: state.users_list
});


export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(UsersList)
);