import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getUsers } from '../../actions/users';
interface Props {
  users_list: object;
  getUsers: (getUsers: number) => Promise<void>;
}

const UsersList: React.FC<Props> = (props) => {
  useEffect(
    () => {
      loadUsers();
    }
  );

  const loadUsers = async () => {
    await props.getUsers(1);
  };

  console.log(props.users_list);

  return <h2>Lista de usuarios</h2>;
};

const mapDispatchToProps = {
  getUsers
};

const mapStateToProps = (state: { users_list: object }) => ({
  users_list: state.users_list
});


export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(UsersList)
);