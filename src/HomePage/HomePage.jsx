import React from 'react';
import { connect } from 'react-redux';
import { history } from '../_helpers';
import { userActions } from '../_actions';

import {Header} from '../Header';
import { ViewTools } from '../ViewTool';
import {AddTool} from '../AddTool';

class HomePage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tab: "get-tools"
    }
    
  }
    componentDidMount() {
       // this.props.getUsers();
    }

    componentWillUnmount(){
      localStorage.removeItem("user")
      this.props.history.push('/login')
    }
    setStateCallBack(tab){
      this.setState({tab})
    }
    redirectOnFinish(){
      this.props.history.push('/')
    }
    switchRender(){
      switch (this.state.tab){
        case "get-tools":
          return (
            localStorage.getItem('user') != null ? <ViewTools/> : this.props.history.push('/login')
          )
        case "add-tool":
          return (
            <AddTool redirect={this.redirectOnFinish.bind(this)}/>
          )
        case "view-users":
          return (
            <div>view users</div>
          )
        case "look-up":
            return (
              <div>look up</div>
            )
        default :
        return (
          localStorage.getItem('user') != null ? <ViewTools/> : this.props.history.push('/login')
        )
      }
    }
    render() {

        const { user, users } = this.props;
        return (
          <div className="ui container">
          <Header switch={this.setStateCallBack.bind(this)}/>
          <div className="ui segment">
          {this.switchRender()}
          
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