import React, {useState} from 'react'
import {connect} from 'react-redux';
import { addTool} from '../_actions';

//#TODO Must populate with list from database
const options = [
  { key: '1', text: 'Test Show', value: 'test' },
  { key: '2', text: 'Amazing Great Show', value: 'amazing great show' },
  { key: '3', text: 'Wow great show', value: 'wow great show' },
]

const AddTool = (props) => {

const [toolname,setToolName] = useState('');
const [description,setDescription] = useState('');
const [showname, setShowname] = useState('')
const [toolNameError,setToolNameError] = useState('')
const [descriptionError,setDescriptionError] = useState('')
const [showNameError,setShowNameError] = useState('')
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
  //form validation for adding tools and filling error fields
if(showname.length == 0 || description.length == 0 || toolname.length == 0){
    toolname.length == 0 ? setToolNameError("* Must Enter a tool name") :  setToolNameError("")
    showname.length == 0 ? setShowNameError("* Must Select a show name") : setShowNameError("")
    description.length == 0 ? setDescriptionError("* Must Enter a description") : setDescriptionError("")
    return;
    }


console.log("showname")
console.log(showname)
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
   window.location = "/";



}
const formStyle = {
    margin:"1em",
}
const errorStyle = {
    color:'red'
}
    return (
        <div className="ui container">
           <div className="ui form">
               <h4 className="ui dividing header">Add Tool to database:</h4>
               <div className="fields">
                   <div className="field">
                       <label>Tool name</label>
                       <input type="text" placeholder='Tool Name' value={toolname} onChange={handleChange}/>
                       {toolNameError != '' ? <span style={errorStyle}>{toolNameError}</span> : toolNameError}
                   </div>
                   <div className="field">
                        <label>Show</label>
                        <select  onChange={e => {
                            console.log(e.target.value)
                            setShowname(e.target.value)}} >
                            <option value="" disabled selected>Select your option</option>
                            {options.length != 0 ? options.map((item,index) => {
                               return  <option key={item.index} value={item.value}>{item.text}</option>
                            }) : <option value="no options">No options</option>}
                        </select>
                       {showNameError != '' ? <span style={errorStyle}>{showNameError}</span> : showNameError}
                   </div>
               </div>
               <div className="field">
                   <label>Description</label>
                   <textarea className="fluid" rows="2" placeholder='Tool Description...' value={description} onChange={handleDescriptionChange}></textarea>
                   {descriptionError != '' ? <span style={errorStyle}>{descriptionError}</span> : descriptionError}
               </div>
               <button onClick={handleSubmit}>Add Tool</button>
           </div>
        </div>
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