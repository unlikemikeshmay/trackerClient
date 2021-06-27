import {toolConstants} from '../_constants';
import {toolService} from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';
import { tools } from '../_reducers/tools.reducer';
import api from '../_services/api';

export const getAll = () => async dispatch => {
  

    var auth = JSON.parse(localStorage.getItem('user'));
    var conf = { headers: {
        'Content-Type': 'application/json',
        'Authorization': `${auth}`
        /* eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpemVkIjp0cnVlLCJleHAiOjE2MTUxMzA5MDMsInVzZXIiOiJ0ZXN0QHRlc3QuY29tIn0.ELZfjw4w_TDEo8SF0QxOBgx1FDkkAWNtZDhXloOssM8 */
    }}
   var response = undefined;
   response = await api.get('/get-tools',conf)

    var data = response.data;
    if (data == "Token is expired"){
        localStorage.removeItem("user");
        history.push('/login');
    }else{
        dispatch({type: toolConstants.GETALL_REQUEST,payload: data})
    }
  
}
export const deleteTool = (uid) => async dispatch => {
  

    var auth = JSON.parse(localStorage.getItem('user'));
    var conf = { headers: {
        'Content-Type': 'application/json',
        'Authorization': `${auth}`
        /* eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpemVkIjp0cnVlLCJleHAiOjE2MTUxMzA5MDMsInVzZXIiOiJ0ZXN0QHRlc3QuY29tIn0.ELZfjw4w_TDEo8SF0QxOBgx1FDkkAWNtZDhXloOssM8 */
    }
}
   var response = undefined;
   response = await api.delete(`/inventory/${uid}`,conf)
   console.log("response for delete: ");
   console.log(response.data)
    var data = response.data;
    if (data == "Token is expired"){
        localStorage.removeItem("user");
        history.push('/login');
    }else{
        console.log('data')
        console.log(data)
        dispatch({type: toolConstants.DELETE_TOOL,payload: data})
    }
  
}
export const updateTool = (tool) => async dispatch => {
  

    var auth = JSON.parse(localStorage.getItem('user'));
    var conf = { headers: {
        'Content-Type': 'application/json',
        'Authorization': `${auth}`
        /* eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpemVkIjp0cnVlLCJleHAiOjE2MTUxMzA5MDMsInVzZXIiOiJ0ZXN0QHRlc3QuY29tIn0.ELZfjw4w_TDEo8SF0QxOBgx1FDkkAWNtZDhXloOssM8 */
    }}
   var response = undefined;
    response = await api.put('/inventory',{
        uid:tool.uid,
        toolname:tool.toolname,
        description:tool.description,
        showname:tool.showname,
        lastusersignout:tool.lastusersignout,
        currentuserid:tool.currentuserid,
        signouttime:tool.signouttime
    },conf)
  
}
export const tokenExpired = () => {
    localStorage.removeItem("user");
    this.props.history.push('/login');
}
export const clearTools = () => {
   return dispatch => {dispatch({type:toolConstants.CLEAR_TOOLS, payload: []})} 
}
export const addTool = (tool) =>  async dispatch => {
    var auth = JSON.parse(localStorage.getItem('user'));
    var conf = { headers: {
        'Content-Type': 'application/json',
        'Authorization': `${auth}`
        /* eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpemVkIjp0cnVlLCJleHAiOjE2MTUxMzA5MDMsInVzZXIiOiJ0ZXN0QHRlc3QuY29tIn0.ELZfjw4w_TDEo8SF0QxOBgx1FDkkAWNtZDhXloOssM8 */
    }}
    console.log("tool inside action")
    console.log(tool)
    var response = undefined;
    response = await api.post('/inventory',{
        uid:tool.uid,
        toolname:tool.toolname,
        description:tool.description,
        showname:tool.showname,
        lastusersignout:tool.lastusersignout,
        currentuserid:tool.currentuserid,
        signouttime:tool.signouttime
    },conf)
    
    dispatch({type:toolConstants.ADD_TOOL,payload:response.data})
}