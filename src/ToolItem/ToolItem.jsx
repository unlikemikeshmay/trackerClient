import React from 'react';
import { Dropdown, Menu } from 'semantic-ui-react';

const ToolItem = (props) => {

const executeAction = (e , {value}) => {

    switch (value){
        case "edit":
            //todo: pop up modal for edit, then call redux action for update
            console.log("edit called");
           props.setEditModal(!props.editModal)
            break;
        case "delete":
            //todo pop up modal asking for permission to delete, redux action on confirm
            console.log("delete called");
            break;
        case "reminder":
            //pop up modal with reminder email options then redux send
            console.log("reminder called")
            break;
        default:
            break;
    }
}

const actionOption = [
    {
        key:"edit",
        text:"Edit",
        value:"edit"
        // add wrench image for edit
    },
    {
        key:"delete",
        text:"Delete",
        value:"delete"
    },
    {
        key:"reminder",
        text:"Send Reminder",
        value:"reminder"
    }
]
return (
<tr className="">
    <td className="">{props.item.uid}</td>
    <td className="">{props.item.toolname}</td>
    <td className="">{props.item.description}</td>
    <td className="">{props.item.showname}</td>
    <td className="">{props.item.lastusersignout}</td>
    <td className="">{props.item.signouttime}</td>
    <td className="">{props.item.currentuserid}</td>
    <td className="">{props.item.lastusersignout}</td>
    <td>
    
    <Menu compact>
    <Dropdown options={actionOption} simple item onChange={executeAction}/>
  </Menu>


    </td>
    
</tr> 
)
}
export default ToolItem;