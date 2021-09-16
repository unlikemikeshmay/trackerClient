import React,{useState} from 'react';

export const UserRecord = (props) => {

    return (
        <tr>
            <td>{props.item.id}</td>
            <td>{props.item.phone}</td>
            <td>{props.item.email}</td>
            <td>{props.item.show}</td>
            <td>{props.item.firstname}</td>
            <td>{props.item.lastname}</td>
            <td>{props.item.department}</td>
        </tr>
    )
}