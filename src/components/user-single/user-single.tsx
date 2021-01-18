import React, { useEffect, useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container } from "react-bootstrap";
import { getUser } from '../../actions/users';
import { objArrayUsers } from '../../models/users';
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(
    () => {
      if (isEmpty(props.users_list)) loadUser();
      else findUser();
    }, []
  );

  const loadUser = async () => {
    const id = props.match.params.id;
    const resp = await getUser(id);
    setUserInfo(resp);
    setIsLoading(false);
  };
  
  const findUser = async () => {
    let id = props.match.params.id;
    var idNumber = +id;
    setUserInfo(props.users_list.filter(result => result.id === idNumber)[0]);
    setIsLoading(false);
  };

  return (
    <div className="user-content">

      <div className="banner">
        <div className="info-single">
          <h2>{userInfo.first_name} <span>{userInfo.last_name}</span></h2>
          {isLoading ? <div className="spinner">
            <div className="double-bounce1"></div>
            <div className="double-bounce2"></div>
          </div> : <img src={userInfo.avatar} alt="avatar" />
          }
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