import React from 'react';
import { connect } from 'react-redux';
import { history } from '../_helpers';
import { userActions } from '../_actions';

import {Header} from '../Header';
import { ViewTools } from '../ViewTool';
import {AddTool} from '../AddTool';
import {UserPage} from '../UserPage';
import {ShowsPage} from "../ShowsPage";

class HomePage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tab: "get-tools"
    }
    
  }
    componentDidMount() {

    }

    componentWillUnmount(){
      localStorage.removeItem("user")
      this.props.history.push('/login')
    }
    setStateCallBack(tab){
      console.log("setting state to: ",tab)
      this.setState({tab})
    }
    redirectOnFinish(){
      this.props.history.push('/')
    }

    switchRender(){
      switch (this.state.tab){
          case "get-tools":
          return (
            localStorage.getItem('user') != null ? <ViewTools redirect={this.redirectOnFinish.bind(this)} switch={this.setStateCallBack.bind(this)}/> : this.props.history.push('/login')
          )
        case "add-tool" :
            return (
                <AddTool />
            )
        case "view-shows":
          return (
            <ShowsPage redirect={this.redirectOnFinish.bind(this)}/>
          )
        case "view-users":
          return (
           <UserPage redirect={this.redirectOnFinish.bind(this)}/>
          )
        case "look-up":
            return (
              <div>look up</div>
            )
        default :
        return (
          localStorage.getItem('user') != null ? <ViewTools switch={this.setStateCallBack.bind(this)}/> : this.props.history.push('/login')
        )
      }
    }

    render() {
        const { user, users } = this.props;
        return (
          <div style={{width:'100vw'}} className="ui container">
          <Header switch={this.setStateCallBack.bind(this)}/>
          <div >
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