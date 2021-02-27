import React from 'react';
import { connect } from 'react-redux';

//import { userActions } from '../_actions';

import {Header} from '../Header';
import { ViewTools } from '../ViewTool';

class HomePage extends React.Component {
    componentDidMount() {
       // this.props.getUsers();
    }

    render() {

        const { user, users } = this.props;
        return (
          <div className="ui container">
            <Header/>
            <div className="ui segment">
            {/* add stuff here */}
            <ViewTools/>
            </div>
          </div>



        );
    }
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}
/* 
const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete
} */

const connectedHomePage = connect(mapState, null)(HomePage);
export { connectedHomePage as HomePage };