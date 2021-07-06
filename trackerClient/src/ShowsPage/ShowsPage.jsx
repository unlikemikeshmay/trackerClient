import React from 'react';
import {Button} from "semantic-ui-react";

export const ShowsPage = () => {
    return (
        <div className="ui form">
            <div className="fields">
                <div className="field">
                    <label>Show name</label>
                    <input type="text" placeholder="First Name"/>
                </div>
                <Button className="small button primary">Add Show</Button>
            </div>
        </div>
    )
}