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
    }}
  
   var response = await api.get('/get-tools',conf)
   console.log("response: ");
   console.log(response.data)
    var data = response.data;
    dispatch({type: toolConstants.GETALL_REQUEST,payload: data})
}
