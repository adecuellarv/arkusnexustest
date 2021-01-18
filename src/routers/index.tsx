import { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import UsersList from '../components/users-list/users-list';

class AppRoutes extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path='/' component={UsersList}  />
                </Switch>
            </div>
        );
    }
}

export default AppRoutes;