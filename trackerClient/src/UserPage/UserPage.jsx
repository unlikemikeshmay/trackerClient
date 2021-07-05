import React,{useState,useEffect} from 'react';
import api from "../_services/api"
import {UserRecord} from "../UserRecord";
import ToolItem from "../ToolItem/ToolItem";



export const UserPage = () => {
    const [userList,setUserList] = useState([])
    useEffect(
        () => {
            retrieveUsers()
        },[]
    )
    const retrieveUsers = async () => {
        let auth = JSON.parse(localStorage.getItem('user'))
        let conf = {headers: {
                'Content-Type': 'application/json',
                'Authorization': `${auth}`
            }}
        await api.get('users',conf)
            .then(
                res => {
                    console.log("res.data is what is getting assigned to userList: ")
                    console.log(res.data)
                    setUserList(res.data);
                }

            )
    }
    return (
        <div>
            <div className="ui pointing menu">
                <a className="active item">
                    Users
                </a>
                <a className="item">
                    Shows
                </a>
                <a className="item">
                    Look-Up
                </a>
                <div className="right menu">
                    <div className="item">
                        <div className="ui transparent icon input">

                        </div>
                    </div>
                </div>
            </div>
            <div className="ui segment">
                <div>
                    <table  className="ui  celled table">
                        <thead className="">
                        <tr className="">
                            <th className="">User Id</th>
                            <th className="">Phone</th>
                            <th className="">Email</th>
                            <th className="">Show</th>
                            <th className="">First Name</th>
                            <th className="">Last Name</th>
                            <th className="">Department</th>
                        </tr>
                        </thead>
                        <tbody style={{overflowX:'scroll',overflowY:'scroll'}} className="">
                        {userList != null ? userList.map((item,index) => (
                            <UserRecord  item={item} key={index}/>
                        )): ""}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>

    )
}
