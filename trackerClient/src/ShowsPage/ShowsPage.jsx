import React,{useState,useEffect} from 'react';
import {Button} from "semantic-ui-react";
import api from "../_services/api";
import {AddTool} from "../AddTool";
import {ShowsList} from "../ShowsList";
import {AddShow} from "../AddShow";

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
                    console.log("res.data in retrieveshows")
                    console.log(res.data)
                    setShowsList(res.data.data)
                }
            )
    }


    const switchTabs = () => {
        switch(currentTab){
            case "add show":
                return <AddShow />;
            case "view shows":
                return ( showsList.length != 0 ? <ShowsList switch={setCurrentTab} showsList={showsList}/> : []);
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
                {viewShowTabActive == true ? <ShowsList showsList={showsList.length != 0 ? showsList : []} /> : switchTabs()}
            </div>

        </div>

    )
}