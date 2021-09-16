import React,{useEffect} from 'react';
import {ShowRecord} from "../ShowRecord";

export const ShowsList = (props) => {
    console.log("props.showList: ",props.showsList)
    console.log("props", props)
    useEffect(
        () => {

        },[props.showsList]
    )
    return (
        <div className="ui segment">
            <div>
                <table  className="ui  celled table">
                    <thead className="">
                    <tr className="">
                        <th className="">Id</th>
                        <th className="">Name</th>
                        <th className="">Production</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody style={{overflowX:'scroll',overflowY:'scroll'}} className="">
                    {props.showsList.length != 0 ? props.showsList.map((item,index) => (
                        <ShowRecord setDeleteOpen={props.setDeleteOpen} setCurrentShow={props.setCurrentShow} setSelectedUID={props.setSelectedUID} switch={props.switch} item={item} key={index} setActionsModal={props.setActionsModal}/>
                    )): []}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
/**/