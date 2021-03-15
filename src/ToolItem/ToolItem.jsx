import React,{useState} from 'react';
import { Dropdown, Menu,Modal,Header,Icon,Button } from 'semantic-ui-react';

const ToolItem = (props) => {
const [selection, setSelection] = useState('');
const [open, setOpen] = React.useState(false)
const executeAction = (e , {value}) => {

    switch (value){
        case "edit":
            //todo: pop up modal for edit, then call redux action for update
            console.log("edit called");
            props.setTool(props.item)
           props.setEditModal(!props.editModal)
           
            break;
        case "delete":
            //todo pop up modal asking for permission to delete, redux action on confirm
            console.log("delete called");
            setOpen(true)
            setSelection("")
            break;
        case "reminder":
            //pop up modal with reminder email options then redux send
            console.log("reminder called")

            setSelection("")
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
    <Dropdown options={actionOption} value={selection} simple item onChange={executeAction }/>
  </Menu>
  <Modal
      basic
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size='small'
      
    >
      <Header icon>
        <Icon name='trash' />
        Delete Record <h1>{props.item.toolname}</h1>
      </Header>
      <Modal.Content>
        <p>
          Are you sure? This Action is irreversible.
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color='red' inverted onClick={() => setOpen(false)}>
          <Icon name='remove' /> No
        </Button>
        <Button color='green' inverted onClick={() => {
            console.log("fired delete tool")
            props.deleteTool(props.item.uid)
            setOpen(false)
        }
    }>
          <Icon name='checkmark' /> Yes
        </Button>
      </Modal.Actions>
    </Modal>

    </td>
    
</tr> 
)
}
export default ToolItem;