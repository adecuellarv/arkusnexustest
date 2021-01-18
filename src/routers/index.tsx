import { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import UsersList from '../components/user-list';
import UserSingle from '../components/user-single';

class AppRoutes extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path='/' component={UsersList}  />
                    <Route exact path='/user/:id' component={UserSingle}/>
                </Switch>
            </div>
        );
    }
}

export default AppRoutes;