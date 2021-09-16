import React,{useState} from 'react';
import {Button} from "semantic-ui-react";
import {uuidv4} from "../_helpers/guid.js";
import api from '../_services/api';
export const AddShow = (props) => {
    const [showName,setShowName] = useState("")
    const [UIDString,setUIDString] = useState("")
    const [showProduction,setShowProduction] = useState("")
    const [nameError,setShowNameError] = useState("")
    const [productionError,setProductionError] = useState("")
    const addShowRequest = async (uid) => {

        console.log("uid derp",uid)
          let show = {
                uid: UIDString,
                show_name:showName,
                production:showProduction
            }
            console.log("show: ",show)
        let auth = JSON.parse(localStorage.getItem('user'));
        let conf = { headers: {
                'Content-Type': 'application/json',
                'Authorization': `${auth}`
            }}
        console.log("show: ",show)

        await api.post('/shows',show,conf)
            .then(
                res => {

                    console.log("res.data inside add show request:",res.data)
                }
            )
        }
        const handleSubmit = (e) => {
            e.preventDefault()
//apply form validation for show submitions
            if(showName === "" || showProduction === ""){
                showName.length === 0 ? setShowNameError("* Must Enter a Show Name") :  setShowNameError("")
                showProduction.length === 0 ? setProductionError("* Must Enter a Production Name") : setProductionError("")
                console.log("exit: ")
                return;
            }
            let uid = uuidv4();
        addShowRequest(uid)

            props.updateList({uid: uid, show_name:showName,production:showProduction})
            props.switch('view shows')

        }
        const buttonStyle = {
        backgroundColor:'black',
            color:'white',

        }
        const errorStyle = {
        color:'red'
        }
            return (
                <div className="ui form">
                    <h4 className="ui dividing header">Add Show to database:</h4>
                    <div className="fields">
                        <div className="field">
                            <label>Show name</label>
                            <input type="text"onChange={(e) => setShowName(e.target.value)} placeholder="Show Name" value={showName}/>
                            {nameError != ""? <span style={errorStyle}>{nameError}</span>:null}
                        </div>
                        <div className="field">
                            <label>Production name</label>
                            <input type="text" placeholder="Production Name" onChange={(e) => setShowProduction(e.target.value)} value={showProduction}/>
                            {productionError != ""? <span style={errorStyle}>{productionError}</span>:null}
                        </div>

                    </div>
                    <div className="field">  <Button style={buttonStyle} onClick={handleSubmit}>Add Show</Button></div>
                </div>
            )
    }

