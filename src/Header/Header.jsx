import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
 const Header = () => {

return (
    <div className="ui secondary pointing menu">
        <a className="item">
        View tools
        </a>
        <a className="item">
        Lookup
        </a>
        <a className="item">
        View Users
        </a>
        <a className="item">
        Add Tool
        </a>
        <Link className="item" to="/add-user">Add User</Link>
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