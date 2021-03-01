import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import ToolItem from '../ToolItem';
import { toolActions } from '../_actions';

const ViewTools = (props) => {
    const [toolState ,setTools] = useState({})
    useEffect(() => {
       setTools(props.getAll())
      
        console.log(`toolState: ${props.tools}`)
    }, [])
    console.log("props")
console.log(props)
    return (
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
                </tr></thead>
                <tbody className="">
               
                </tbody>
            </table>
     
    )
}

const mapStateToProps = (state) => {
    
    return {tools: state.tools}
}
const actionCreators = {
    getAll: toolActions.getAll
}
const connectedViewToolPage = connect(mapStateToProps,actionCreators)(ViewTools)
export {connectedViewToolPage as ViewTools};