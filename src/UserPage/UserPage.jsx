import React,{useState,useEffect} from 'react';
import api from "../_services/api"
import {UserRecord} from "../UserRecord";
import {ShowsPage} from "../ShowsPage";
import ToolItem from "../ToolItem/ToolItem";



export const UserPage = () => {
    const [userList,setUserList] = useState([])
    const [userTabActive, setUsersTabActive] = useState(true)
    const [showTabActive, setShowTabActive] = useState(false)
    const [lookupTab,setLookupTabActive] = useState(false)
    const [currentTab, setCurrentTab] = useState(["users"])
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
                    setUserList(res.data)
                }

            )
    }
    const renderUserTab = () => {
        return (
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
        )
    }
    const switchTabs = () => {
        switch(currentTab){
            case "users":
                return renderUserTab();
            case "shows":
                return <ShowsPage/>
            default:
                return null;


        }
    }
    return (
        <div>
            <div className="ui pointing menu">
                <p className={userTabActive == true ? "active item" : "item"}  onClick={() => {
                    console.log("setting current tab to users")
                    if(!userTabActive){
                        setUsersTabActive(true)
                        setLookupTabActive(false)
                        setShowTabActive(false)
                    }
                    setCurrentTab("users")}
                }>Users</p>
                <p className={showTabActive == true ? "active item" : "item"} onClick={() => {
                    if(!showTabActive){
                        setShowTabActive(true)
                        setLookupTabActive(false)
                        setUsersTabActive(false)
                    }
                    setCurrentTab("shows")
                }
                }>Shows</p>
                <p className={lookupTab == true ? "active item" : "item"} onClick={() => {
                    if(!lookupTab){
                        setUsersTabActive(false)
                        setLookupTabActive(true)
                        setShowTabActive(false)
                    }
                    setCurrentTab("look-up")
                }
                }>Look-Up</p>

            </div>
            <div className="ui segment">
                {userTabActive == true ? renderUserTab() : switchTabs()}
            </div>

        </div>

    )
}



