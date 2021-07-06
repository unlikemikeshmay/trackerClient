import React from 'react';
import {Button} from "semantic-ui-react";

export const ShowsPage = () => {
    const buttonStyle = {
        marginTop:'10px',
        backgroundColor:"black",
        color:'white'
    }
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