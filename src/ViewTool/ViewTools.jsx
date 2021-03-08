import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import { alertActions } from '../_actions';
import ToolItem from '../ToolItem/ToolItem';
import { toolActions,getAll,clearTools } from '../_actions';

const ViewTools = (props) => {

   
    useEffect(() => {
        //this.props.clearAlerts();
       if(props.tools != undefined){
           props.clearTools()
       }
      props.getAll()
       
    }, [])


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
              
                {props.tools != undefined ? props.tools.map((item,index) => (
                    <ToolItem item={item} key={index}/>
                )): ""}
                    
                </tbody>
            </table>
     
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
