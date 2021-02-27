import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';


import { toolActions } from '../_actions';

const ViewTools = (props) => {
    const [toolState ,setTools] = useState({})
    useEffect(() => {
       props.getAll()
       setTools(props.tools)
        console.log(toolState)
    }, [toolState])
    return (
    <div>

    <div>View Toolz</div>
   {/*  {toolState ? toolState : ''} */}
    </div>
     
    )
}
const mapStateToProps = (state) => {
    const {tools} = state.tools;
    return {tools}
}
const actionCreators = {
    getAll: toolActions.getAll
}
const connectedViewToolPage = connect(mapStateToProps,actionCreators)(ViewTools)
export {connectedViewToolPage as ViewTools};