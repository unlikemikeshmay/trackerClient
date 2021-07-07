import React from 'react'

export const ShowRecord = (props) => {
    return (
        <tr className="">
            <td className="">{props.item.uid ? props.item.uid : ''}</td>
            <td className="">{props.item.name}</td>
            <td className="">{props.item.production}</td>
        </tr>
    )
}