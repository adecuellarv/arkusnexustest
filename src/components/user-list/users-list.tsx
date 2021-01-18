import React, { useEffect } from 'react';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { getUsers } from '../../actions/users';
import { objArrayUsers } from '../../models/users';
import './users-list.scss';

interface Props {
  users_list: typeof objArrayUsers;
  getUsers: (getUsers: number) => Promise<void>;
}

const UsersList: React.FC<Props> = (props) => {

  useEffect(
    () => {
      loadUsers();
    }, []
  );

  const loadUsers = async () => {
    await props.getUsers(1);
  };

  return (
    <div className="principal">
      <Container>
        <Row>
          {!isEmpty(props.users_list) && props.users_list.map(function (user, key) {
            return (
              <Col xs={12} md={6} lg={4} key={key}>
                <div className="card" >
                  <div>
                    <Link to={`/user/${user.id}`}><img src={user.avatar} alt="avatar" /></Link>
                    <div className="user-info">
                      <Link to={`/user/${user.id}`}><h5>{user.first_name} {user.last_name}</h5></Link>
                      <p>{user.email}</p>
                      <div>
                        <label><FontAwesomeIcon icon={faPencilAlt} /></label>
                        <label><FontAwesomeIcon icon={faTimes} /></label>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

const mapDispatchToProps = {
  getUsers
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