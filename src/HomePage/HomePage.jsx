import React from 'react';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

import {Header} from '../Header';
import { ViewTools } from '../ViewTool';

class HomePage extends React.Component {
    componentDidMount() {
       // this.props.getUsers();
    }

    componentWillUnmount(){
      localStorage.removeItem("user")
      this.props.history.push('/login')
    }
    render() {

        const { user, users } = this.props;
        return (
          <div className="ui container">
            <Header/>
            <div className="ui segment">
{localStorage.getItem('user') != null ? <ViewTools/> : this.props.history.push('/login')}
            
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

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete,
    //clearUser: userActions.

}

const connectedHomePage = connect(mapState, null)(HomePage);
export { connectedHomePage as HomePage };