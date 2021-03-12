import React, {useState} from 'react'
import { Form } from 'semantic-ui-react'
import {connect} from 'react-redux';
import { addTool} from '../_actions';

const options = [
  { key: '1', text: 'test show', value: 'test1' },
  { key: '2', text: 'amazing great show', value: 'test2' },
  { key: '3', text: 'wow great show', value: 'test3' },
]

const AddTool = (props) => {

const [toolname,setToolName] = useState('')
const [description,setDescription] = useState('')
const  handleChange = (e) => {

  setToolName(e.target.value)
  console.log(toolname)
}
const handleDescriptionChange = (e) =>{

  setDescription(e.target.value)
  console.log(description) 
}

const handleSubmit = (e) => {
  e.preventDefault();
  var tool = {
    toolname: toolname,
    description: description
  }
  props.addTool(props.user,tool)

console.log("handle submit fired")

}


    return (
      <Form onSubmit={handleSubmit}>
        <Form.Group widths='equal'>
          <Form.Input fluid label='Tool Name' placeholder='Tool Name' value={toolname} onChange={handleChange}/>
         
          <Form.Select
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
const {user} = state
}
const actionCreators = {
  addTool: addTool
}
const connectedAddTool = connect(mapStateToProps,actionCreators)(AddTool)
export {connectedAddTool as AddTool};