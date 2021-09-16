import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import ToolItem from '../ToolItem/ToolItem';
import { alertActions,getAll,clearTools,updateTool,deleteTool } from '../_actions';
import { Button, Icon, Modal,Form } from 'semantic-ui-react'
import api from "../_services/api";
import {history} from "../_helpers";
import {toolConstants} from "../_constants";
import {ShdowsPage} from "../ShowsPage";
import {AddTool} from "../AddTool";

const options = [
    { key: '1', text: 'Test Show', value: 'test' },
    { key: '2', text: 'Amazing Great Show', value: 'amazing great show' },
    { key: '3', text: 'Wow great show', value: 'wow great show' },
  ]
const ViewTools = (props) => {
const [currentTool,setCurrentTool] = useState([])
const [editModalOpen, setEditModalOpen] = useState(false);

const [firstOpen, setFirstOpen] = React.useState(false)
const [deleteOpen,setDeleteOpen] = React.useState(false);
const [secondOpen, setSecondOpen] = React.useState(false)
const [toolname,setToolName] = useState('');
const [description,setDescription] = useState('');
const [showname, setShowname] = useState('')
const [toggle,setToggle] = useState(false)
    //tab control
    const [userList,setUserList] = useState([])
    const [userTabActive, setUsersTabActive] = useState(true)
    const [showTabActive, setShowTabActive] = useState(false)
    const [lookupTab,setLookupTabActive] = useState(false)
    const [currentTab, setCurrentTab] = useState(["users"])

    useEffect(() => {

        //why am i clearing this?
       if(props.tools != undefined){
           props.clearTools()
       }

       retrieveTools()
      props.getAll()

    }, [])

    const retrieveTools = async () => {
        var auth = JSON.parse(localStorage.getItem('user'));
        var conf = { headers: {
                'Content-Type': 'application/json',
                'Authorization': `${auth}`
                /* eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpemVkIjp0cnVlLCJleHAiOjE2MTUxMzA5MDMsInVzZXIiOiJ0ZXN0QHRlc3QuY29tIn0.ELZfjw4w_TDEo8SF0QxOBgx1FDkkAWNtZDhXloOssM8 */
            }}
        let response = undefined;
        response = await api.get('/get-tools',conf).then(
            res => {
               response  = res.data;
                setCurrentTool(res.data)
            }
        )
        if (response == "Token is expired"){
            localStorage.removeItem("user");
            history.push('/login');
        }

    }
    const toggleState = () => {
    setToggle(!toggle)
        console.log("toggle: ",toggle)
        window.location = '/'
    }
    const  handleChange = (e) => {

      setToolName(e.target.value)
      console.log(toolname)
    }
    const update = () => {
    props.getAll()
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
      let id;
      if(currentTool == null){
          id = ""
      }else{
          id = currentTool.uid
      }
      var tool = {
        "uid":id,
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
    const switchTabs = () => {
        switch(currentTab){
            case "users":
                return renderToolTab();
            case "add tool":
                return <AddTool/>
            default:
                return null;


        }
    }
const renderToolTab = () => {
    return (
        <table  className="ui  celled table">
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
            <tbody style={{overflowX:'scroll',overflowY:'scroll'}} className="">

            {currentTool != null ? currentTool.map((item,index) => (
                <ToolItem  deleteTool={props.deleteTool} setTool={handleTool}  editModal={editModalOpen} toggle={toggleState} setEditModal={openEditModal} item={item} key={index} setDeleteOpen={setDeleteOpen} deleteOpen={deleteOpen}/>
            )): ""}

            </tbody>
        </table>
    )
}

    return (

        currentTool ?
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
            <Icon name='edit' />
          </div>
          <Modal.Description>
            <p>You may edit existing, or delete record.</p><p><span style={{color:'red'}}><h3>*Warning* </h3></span></p><p> All Changes are final.</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
        <Button onClick={() => setEditModalOpen(false)} >
            Cancel <Icon name='ban' />
          </Button>
        <Button onClick={() => setSecondOpen(true)} primary>
            Edit Record  <Icon name='right chevron'/>
        </Button>
          <Button onClick={() => setDeleteOpen(true)} negative>
            Delete Record  <Icon name='trash'/>
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
                <div>
                    <div className="ui pointing menu">
                        <p className={userTabActive == true ? "active item" : "item"}  onClick={() => {
                            console.log("setting current tab to users")
                            if(!userTabActive){
                                setUsersTabActive(true)
                                setLookupTabActive(false)
                                setShowTabActive(false)
                            }
                            setCurrentTab("users")}
                        }>Tools</p>
                        <p className={showTabActive == true ? "active item" : "item"} onClick={() => {
                            if(!showTabActive){
                                setShowTabActive(true)
                                setLookupTabActive(false)
                                setUsersTabActive(false)
                            }
                            setCurrentTab("add tool")
                        }
                        }>Add Tool</p>
                        <p className={lookupTab == true ? "active item" : "item"} onClick={() => {
                            if(!lookupTab){
                                setUsersTabActive(false)
                                setLookupTabActive(true)
                                setShowTabActive(false)
                            }
                            setCurrentTab("look-up")
                        }
                        }>Look-Up</p>

                    </div>
                    <div className="ui segment">
                        {userTabActive == true ? renderToolTab() : switchTabs()}
                    </div>

                </div>



        </div> : <div  className="ui placeholder segment">
            <div className="ui icon header">
                <i className="icon"></i>
                No tools have been added yet
            </div>
            <div className="ui secondary button" onClick={() => {
                console.log("inside anonymous function for add tool")
                console.log(props)
                props.switch("add-tool")

            }
            }>Add Tool</div>
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
