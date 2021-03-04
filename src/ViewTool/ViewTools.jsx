import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import { alertActions } from '../_actions';
import ToolItem from '../ToolItem/ToolItem';
import { toolActions } from '../_actions';

const ViewTools = (props) => {
    const [toolState ,setTools] = useState({})
    useEffect(() => {
        //this.props.clearAlerts();
       
      props.getAll()
       console.log('toolstate')
        console.log(props.tools)
    }, [])
/*     console.log("props")
console.log(props.tools.tools) */
/* const items = () => {
    props.tools.map((item, idx) => {
       return <ToolItem item={item} key={idx} />
    })
}  */
var tools
if (props.tools.tools != undefined){
    tools = Object.entries(props.tools.tools)

}else {
    tools = "fukc"
}
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
    console.log("state")
    console.log(state)
    return {tools: state.tools}
}
const actionCreators = {
    getAll: toolActions.getAll,
    clearAlerts: alertActions.clear
}
const connectedViewToolPage = connect(mapStateToProps,actionCreators)(ViewTools)
export {connectedViewToolPage as ViewTools};