import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import { alertActions } from '../_actions';
import ToolItem from '../ToolItem/ToolItem';
import { toolActions,getAll,clearTools } from '../_actions';
import { Button, Icon, Modal,Form } from 'semantic-ui-react'


const options = [
    { key: '1', text: 'Test Show', value: 'test' },
    { key: '2', text: 'Amazing Great Show', value: 'amazing great show' },
    { key: '3', text: 'Wow great show', value: 'wow great show' },
  ]
const ViewTools = (props) => {
const [editModalOpen, setEditModalOpen] = useState(false);
const [firstOpen, setFirstOpen] = React.useState(false)
const [secondOpen, setSecondOpen] = React.useState(false)
    useEffect(() => {
        //this.props.clearAlerts();
       if(props.tools != undefined){
           props.clearTools()
       }
      props.getAll()
       
    }, [])

const openEditModal = (val) => {
    setEditModalOpen(val)
}
    return (
        <div>
             <>
     

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
          <Modal.Header>Edit Record []</Modal.Header>
          <Modal.Content>
          <Form >
        <Form.Group widths='equal'>
          <Form.Input fluid label='Tool Name' placeholder='Tool Name' />
         
          <Form.Select
           
            fluid
            label='Show'
            options={options}
            placeholder='Show'
          />
         
        </Form.Group>
      
        <Form.TextArea label='Description' placeholder='Tool Description...' />
        
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
                    <ToolItem editModal={editModalOpen} setEditModal={openEditModal} item={item} key={index}/>
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
    clearTools: clearTools
}
const connectedViewToolPage = connect(mapStateToProps,actionCreators)(ViewTools)
export {connectedViewToolPage as ViewTools};
