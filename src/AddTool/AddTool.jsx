import React, {useState} from 'react'
import { Form } from 'semantic-ui-react'
import {connect} from 'react-redux';
import { addTool} from '../_actions';

const options = [
  { key: '1', text: 'Test Show', value: 'test' },
  { key: '2', text: 'Amazing Great Show', value: 'amazing great show' },
  { key: '3', text: 'Wow great show', value: 'wow great show' },
]

const AddTool = (props) => {

const [toolname,setToolName] = useState('');
const [description,setDescription] = useState('');
const [showname, setShowname] = useState('')
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
    "uid":null,
    "toolname":toolname,
	  "description":description,
	  "showname":showname,
	  "lastusersignout":null,
	  "currentuserid":null,
	  "signouttime":null
  }

  props.addTool(tool)

props.redirect()

}


    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group widths='equal'>
          <Form.Input fluid label='Tool Name' placeholder='Tool Name' value={toolname} onChange={handleChange}/>
        
          <Form.Select
            onChange={handleSelect}
            fluid
            label='Show'
            options={options}
            placeholder='Show'
          />
   
        </Form.Group>
      
        <Form.TextArea label='Description' placeholder='Tool Description...' value={description} onChange={handleDescriptionChange}/>
        
        <Form.Button>Submit</Form.Button>
      </Form>
    )
  
}
const mapStateToProps = (state) => {
return {
  user: state.user
}
}
const actionCreators = {
  addTool: addTool
}
const connectedAddTool = connect(mapStateToProps,actionCreators)(AddTool)
export {connectedAddTool as AddTool};