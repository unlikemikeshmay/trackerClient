import React,{useState,useEffect} from 'react';
import {Button} from "semantic-ui-react";
import api from "../_services/api";

export const ShowsPage = () => {
    const [showsList,setShowsList] = useState([])

    //tab control
    const [userList,setUserList] = useState([])
    const [userTabActive, setUsersTabActive] = useState(true)
    const [showTabActive, setShowTabActive] = useState(false)
    const [lookupTab,setLookupTabActive] = useState(false)
    const [currentTab, setCurrentTab] = useState(["users"])
    useEffect(
        () => {
            retrieveShows()
        },[]
    )
    // network calls
    const retrieveShows = async () => {
        let auth = JSON.parse(localStorage.getItem('user'))
        let conf = {headers: {
                'Content-Type': 'application/json',
                'Authorization': `${auth}`
            }}
        await api.get('/shows',conf)
            .then(
                res => {
                    setShowsList(res.data)
                }
            )
    }
    const addShow = async () => {
        let auth = JSON.parse(localStorage.getItem('user'))
        let conf = {headers: {
                'Content-Type': 'application/json',
                'Authorization': `${auth}`
            }}
        await api.post('',)
    }
    const renderShowTab = () => {
        return (
            <div className="ui form">
                <h4 className="ui dividing header">Add Show to database:</h4>
                <div className="fields">
                    <div className="field">
                        <label>Show name</label>
                        <input type="text" placeholder="First Name"/>
                        <Button style={buttonStyle} >Add Show</Button>
                    </div>

                </div>
            </div>
        )
    }
    const buttonStyle = {
        marginTop:'10px',
        backgroundColor:"black",
        color:'white'
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
                }>View Shows</p>
                <p className={showTabActive == true ? "active item" : "item"} onClick={() => {
                    if(!showTabActive){
                        setShowTabActive(true)
                        setLookupTabActive(false)
                        setUsersTabActive(false)
                    }
                    setCurrentTab("add tool")
                }
                }>Add Shows</p>
                <p className={lookupTab == true ? "active item" : "item"} onClick={() => {
                    if(!lookupTab){
                        setUsersTabActive(false)
                        setLookupTabActive(true)
                        setShowTabActive(false)
                    }
                    setCurrentTab("look-up")
                }
                }>Look-Up Show</p>

            </div>
            <div className="ui segment">
                {userTabActive == true ? renderShowTab() : switchTabs()}
            </div>

        </div>

    )
}