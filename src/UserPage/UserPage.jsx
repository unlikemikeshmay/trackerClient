import React,{useState,useEffect} from 'react';
import api from "../_services/api"
import {UserRecord} from "../UserRecord";



export const UserPage = (props) => {
    const [userList,setUserList] = useState([])
    useEffect(
        () => {
            setUserList(retrieveUsers())
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
                    console.log(res.data)
                    return res.data;
                }

            )
    }
    return (
        <div>
            <table  className="ui  celled table">
                <thead className="">
                <tr className="">
                    <th className="">User Id</th>
                    <th className="">Phone</th>
                    <th className="">Email</th>
                    <th className="">Show Name</th>
                    <th className="">Last User</th>
                    <th className="">Department</th>
                </tr>
                </thead>
                <tbody style={{overflowX:'scroll',overflowY:'scroll'}} className="">
                {userList != null ? userList.map((item,index) => (
                    <UserRecord/>
                )) : ""}
                </tbody>
            </table>
        </div>
    )
}
