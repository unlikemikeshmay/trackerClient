import React from 'react';
import {UserRecord} from "../UserRecord";

export const ShowsList = (props) => {
    return (
        <div className="ui segment">
            <div>
                <table  className="ui  celled table">
                    <thead className="">
                    <tr className="">
                        <th className="">Id</th>
                        <th className="">Name</th>
                        <th className="">Production</th>
                    </tr>
                    </thead>
                    <tbody style={{overflowX:'scroll',overflowY:'scroll'}} className="">
                    {props.showsList != null ? props.showsList.map((item,index) => (
                        <ShowRecord  item={item} key={index}/>
                    )): ""}
                    </tbody>
                </table>
            </div>
        </div>
    )
}