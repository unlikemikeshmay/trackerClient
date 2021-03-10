import React, {useState} from 'react'
import { Form } from 'semantic-ui-react'
import {connect} from 'react-redux';
import { addTool} from '../_actions';

const options = [
  { key: '1', text: 'test show', value: 'test1' },
  { key: '2', text: 'amazing great show', value: 'test2' },
  { key: '3', text: 'wow great show', value: 'test3' },
]

const AddTool = () => {

const [value,setValue] = useState('')
const  handleChange = (e, { value }) => setValue({ value })


    return (
      <Form>
        <Form.Group widths='equal'>
          <Form.Input fluid label='Tool Name' placeholder='Tool Name' />
         
          <Form.Select
            fluid
            label='Show'
            options={options}
            placeholder='Show'
          />
        </Form.Group>
      
        <Form.TextArea label='About' placeholder='Tool Description...' />
        
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