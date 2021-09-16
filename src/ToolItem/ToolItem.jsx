import React,{useState} from 'react';
import {Modal,Header,Icon,Button } from 'semantic-ui-react';

const ToolItem = (props) => {
const [selection, setSelection] = useState('');
const [open, setOpen] = React.useState(false)

return (
<tr className="">
    <td className="">{props.item.uid ? props.item.uid : ''}</td>
    <td className="">{props.item.toolname}</td>
    <td className="">{props.item.description}</td>
    <td className="">{props.item.showname}</td>
    <td className="">{props.item.lastusersignout}</td>
    <td className="">{props.item.signouttime}</td>
    <td className="">{props.item.currentuserid}</td>
    <td className="">{props.item.lastusersignout}</td>

    <td>

        <button className="ui button" onClick={() => {
            props.setEditModal(!props.editModal)
            setOpen(!open)
        } }>
            <i className="bars icon"></i>
        </button>

  <Modal
      basic
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={props.deleteOpen}
      size='small'
      
    >
      <Header icon>
        <Icon name='trash' />
        Delete Record <h1>{props.item.toolname ? props.item.toolname : ''}</h1>
      </Header>
      <Modal.Content>
        <p>
          Are you sure? This Action is irreversible.
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color='red' inverted onClick={
            () => {
                props.setDeleteOpen(!props.deleteOpen)
                setOpen(false)
            }
        }>
          <Icon name='remove' /> No
        </Button>
        <Button color='green' inverted onClick={() => {
            console.log("fired delete tool")
            props.deleteTool(props.item.uid)
            props.setDeleteOpen(!props.deleteOpen)
            props.setEditModal(false)
            props.toggle()
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