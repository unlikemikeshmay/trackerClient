import React,{useState,useEffect} from 'react';
import {Button} from "semantic-ui-react";
import api from "../_services/api";
import {AddTool} from "../AddTool";
import {ShowsList} from "../ShowsList";

export const ShowsPage = () => {
    const [showsList,setShowsList] = useState([])

    //tab control
    const [userList,setUserList] = useState([])
    const [viewShowTabActive, setViewShowTabActive] = useState(true)
    const [addShowTabActive, setAddShowTabActive] = useState(false)
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
        await api.post('/shows',conf)
            .then(
                res => {

                }
            )
    }
    const renderAddShowTab = () => {
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
    const switchTabs = () => {
        switch(currentTab){
            case "add show":
                return renderAddShowTab();
            case "view shows":
                return <ShowsList showsList={showsList.length != 0 ? showsList : ""} />
            default:
                return null;


        }
    }
    const buttonStyle = {
        marginTop:'10px',
        backgroundColor:"black",
        color:'white'
    }
    return (
        <div>
            <div className="ui pointing menu">
                <p className={viewShowTabActive == true ? "active item" : "item"}  onClick={() => {
                    console.log("setting current tab to view shows")
                    if(!viewShowTabActive){
                        setViewShowTabActive(true)
                        setLookupTabActive(false)
                        setAddShowTabActive(false)
                    }
                    setCurrentTab("view shows")
                }
                }>View Shows</p>
                <p className={addShowTabActive == true ? "active item" : "item"} onClick={() => {
                    if(!addShowTabActive){
                        setAddShowTabActive(true)
                        setLookupTabActive(false)
                        setViewShowTabActive(false)
                    }
                    setCurrentTab("add show")
                }
                }>Add Shows</p>
                <p className={lookupTab == true ? "active item" : "item"} onClick={() => {
                    if(!lookupTab){
                        setViewShowTabActive(false)
                        setLookupTabActive(true)
                        setAddShowTabActive(false)
                    }
                    setCurrentTab("look-up")
                }
                }>Look-Up Show</p>

            </div>
            <div className="ui segment">
                {viewShowTabActive == true ? renderAddShowTab() : switchTabs()}
            </div>

        </div>

    )
}