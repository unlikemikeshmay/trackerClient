import {toolConstants} from '../_constants';
import {toolService} from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';
import { tools } from '../_reducers/tools.reducer';

export const toolActions = {
    getAll
}
function getAll() {
    return dispatch => {
       /*  dispatch(request()); */

        toolService.getAll()
            .then(
                tools => dispatch(success(tools)),
                console.log("tools in action"),
                console.log(tools),
                error => {
                    dispatch(failure(error.toString()))
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };
    
    function request(tools) { return { type: toolConstants.GETALL_REQUEST,tools } }
    function success(tools) { return { type: toolConstants.GETALL_SUCCESS, tools } }
    function failure(error) { return { type: toolConstants.GETALL_FAILURE, error } }
}