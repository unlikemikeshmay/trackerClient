import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import ToolItem from '../ToolItem/ToolItem';
import { alertActions,getAll,clearTools,updateTool,deleteTool } from '../_actions';
import { Button, Icon, Modal,Form } from 'semantic-ui-react'
import SimpleModal from '../Modals/SimpleModal';


const options = [
    { key: '1', text: 'Test Show', value: 'test' },
    { key: '2', text: 'Amazing Great Show', value: 'amazing great show' },
    { key: '3', text: 'Wow great show', value: 'wow great show' },
  ]
const ViewTools = (props) => {
const [currentTool,setCurrentTool] = useState({})
const [editModalOpen, setEditModalOpen] = useState(false);
const [firstOpen, setFirstOpen] = React.useState(false)
const [deleteOpen,setDeleteOpen] = useState('');
const [secondOpen, setSecondOpen] = React.useState(false)
const [toolname,setToolName] = useState('');
const [description,setDescription] = useState('');
const [showname, setShowname] = useState('')
    useEffect(() => {
        //this.props.clearAlerts();
       if(props.tools != undefined){
           props.clearTools()
       }
       /* return ()=>{
         setCurrentTool({})
       } */
      props.getAll()
       
    }, [currentTool])
    const  handleChange = (e) => {

      setToolName(e.target.value)
      console.log(toolname)
    }
    const handleDescriptionChange = (e) =>{
    
      setDescription(e.target.value)
      console.log(description) 
    }
    const handleSelect = (e,{value}) => {
      
      setShowname(value)
      console.log(showname)
    }
    const handleSubmit = (e) => {
      e.preventDefault();
    
      var tool = {
        "uid":currentTool.uid,
        "toolname":toolname,
        "description":description,
        "showname":showname,
        "lastusersignout":null,
        "currentuserid":null,
        "signouttime":null
      }
      props.updateTool(tool)
    }
const handleTool = (val) => {
  setCurrentTool(val)
}
const openEditModal = (val) => {
    setEditModalOpen(val)
   
}
    return (
        <div>
             <>
             <SimpleModal />
      <Modal
        onClose={() => setFirstOpen(false)}
        onOpen={() => setFirstOpen(true)}
        open={editModalOpen}
      >
        <Modal.Header>Edit Record?</Modal.Header>
        <Modal.Content image>
          <div className='image'>
            <Icon name='right arrow' />
          </div>
          <Modal.Description>
            <p>Are you sure you want to edit record?</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
        <Button onClick={() => setEditModalOpen(false)} >
            Cancel <Icon name='ban' />
          </Button>
          <Button onClick={() => setSecondOpen(true)} primary>
            Proceed <Icon name='right chevron'/>
          </Button>
        </Modal.Actions>

        <Modal
          onClose={() => setSecondOpen(false)}
          open={secondOpen}
          size='small'
        >
          <Modal.Header>Edit Record <h1>{currentTool.toolname}</h1></Modal.Header>
          <Modal.Content>
          <Form onSubmit={handleSubmit}>
        <Form.Group widths='equal'>
          <Form.Input fluid label='Tool Name' placeholder={currentTool.toolname} value={toolname} onChange={handleChange}/>
         
          <Form.Select
           onChange={handleSelect}
            fluid
            label='Show'
            options={options}
            placeholder={currentTool.showname}
          />
         
        </Form.Group>
      
        <Form.TextArea label='Description' placeholder={currentTool.description} value={description} onChange={handleDescriptionChange}/>
        
        <Form.Button>Submit</Form.Button>
      </Form>
          </Modal.Content>
          <Modal.Actions>
          <Button
              icon='ban'
              content='Cancel'
              onClick={() => setSecondOpen(false)}
            />
            <Button
              icon='check'
              content='All Done'
              onClick={() =>{ 
                  setSecondOpen(false)
                  setEditModalOpen(false)
                  setCurrentTool({})
                }}
            />
          </Modal.Actions>
        </Modal>
      </Modal>
    </>
            <table className="ui celled inverted selectable table">
            <thead className="">
                <tr className="">
                    <th className="">Id</th>
                    <th className="">Tool Name</th>
                    <th className="">Description</th>
                    <th className="">Showname</th>
                    <th className="">Last User</th>
                    <th className="">Last User Sign out</th>
                    <th className="">Current User</th>
                    <th className="">Current User Sign out</th>
                    <th>Actions</th>
                    
                </tr></thead>
                <tbody className="">
              
                {props.tools != undefined ? props.tools.map((item,index) => (
                    <ToolItem deleteTool={deleteTool}  setTool={handleTool}  editModal={editModalOpen} setEditModal={openEditModal} item={item} key={index}/>
                )): ""}
                    
                </tbody>
            </table>
        </div>
        
     
    )
}

const mapStateToProps = (state) => {
    return {tools: state.tools}
}
const actionCreators = {
    getAll: getAll,
    clearAlerts: alertActions.clear,
    clearTools: clearTools,
    updateTool: updateTool,
    deleteTool:deleteTool
}
const connectedViewToolPage = connect(mapStateToProps,actionCreators)(ViewTools)
export {connectedViewToolPage as ViewTools};
