import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
 const Header = (props) => {

return (
    <div className="ui secondary pointing menu">
        <p className="item" onClick={ () => {props.switch("get-tools")}}>
        Tools
        </p>
        <p className="item" onClick={ () => {props.switch("view-shows")}}>
        Shows
        </p>
        <p className="item" onClick={ () => {props.switch("view-users")}}>
        Users
        </p>
        <p className="item" onClick={ () => {props.switch("look-up")}}>
        Look Up
        </p>

        <div className="right menu">
        <Link className="item" to="/login">Logout</Link>
        </div>
    </div>
    )
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

const connectedHeader = connect(mapState, null)(Header);
export { connectedHeader as Header };