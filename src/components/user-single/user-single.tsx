import React, { useEffect, useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { getUser } from '../../actions/users';
import { objArrayUsers, objectUser } from '../../models/users';
import './user-single.scss';

let objMatch: { params: { id: number } }

interface Props {
  users_list: typeof objArrayUsers;
  match: typeof objMatch;
}

const UserSingle: React.FC<Props> = (props) => {
  const [userInfo, setUserInfo] = useState({
    id: 0,
    email: '',
    first_name: '',
    last_name: '',
    avatar: ''
  });

  useEffect(
    () => {
      if (isEmpty(props.users_list)) loadUser();
      else loadUser();
    }, []
  );

  const loadUser = async () => {
    const id = props.match.params.id;
    const resp = await getUser(id);
    setUserInfo(resp);
  };

  const findUser = async () => {
    let id = props.match.params.id;
    console.log(props.users_list[0].id, id)
    setUserInfo(props.users_list.filter(result => result.id === id)[0]);
  };

  console.log(userInfo);

  return (
    <div className="user-content">

      <div className="banner">
        <div className="info-single">
          <h2>{userInfo.first_name} <span>{userInfo.last_name}</span></h2>
          <img src={userInfo.avatar} alt="avatar" />
        </div>
      </div>
      <div>
        <Container>
          <div className="card card-single">
            <label className="email-single">{userInfo.email}</label>

            <h5>Bio.</h5>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem ducimus soluta, iusto delectus eum praesentium placeat excepturi quidem ad reprehenderit neque alias tempore, repellat maiores necessitatibus ipsum saepe eius? Natus.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem ducimus soluta, iusto delectus eum praesentium placeat excepturi quidem ad reprehenderit neque alias tempore, repellat maiores necessitatibus ipsum saepe eius? Natus.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem ducimus soluta, iusto delectus eum praesentium placeat excepturi quidem ad reprehenderit neque alias tempore, repellat maiores necessitatibus ipsum saepe eius? Natus.
            </p>
          </div>
        </Container>
      </div>
    </div>
  );
};

const mapStateToProps = (state: { users_list: typeof objArrayUsers }) => ({
  users_list: state.users_list
});


export default withRouter(
  connect(
    mapStateToProps
  )(UserSingle)
);