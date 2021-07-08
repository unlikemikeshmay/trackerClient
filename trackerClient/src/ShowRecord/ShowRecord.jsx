import React from 'react'

export const ShowRecord = (props) => {
    return (
        <tr className="">
            <td className="">{props.item.uid ? props.item.uid : ''}</td>
            <td className="">{props.item.name}</td>
            <td className="">{props.item.production}</td>
            <button className="ui button" onClick={() => {
                props.setEditModal(!props.editModal)
                setOpen(!open)
            } }>
                <i className="bars icon"></i>
            </button>
        </tr>
    )
}