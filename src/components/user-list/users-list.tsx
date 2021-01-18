import React, { useEffect } from 'react';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from "react-bootstrap";
import { getUsers } from '../../actions/users';
import './users-list.scss';

export let objArray: Array<{ id: number, email: string, first_name: string, last_name: string, avatar: string }>;

interface Props {
  users_list: typeof objArray;
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
              <Col xs={12} md={6} lg={4}>
                <div className="card" key={key}>
                  <div>
                    <img src={user.avatar} alt="avatar" />
                    <div className="user-info">
                      <h5>{user.first_name} {user.last_name}</h5>
                      <label>{user.email}</label>
                      <div>

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

const mapStateToProps = (state: { users_list: typeof objArray }) => ({
  users_list: state.users_list
});


export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(UsersList)
);