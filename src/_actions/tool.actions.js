import {toolConstants} from '../_constants';
import {toolService} from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const toolActions = {
    getAll
}
function getAll() {
    return dispatch => {
        dispatch(request());

        toolService.getAll()
            .then(
                tools => dispatch(success(tools)),
                error => dispatch(failure(error.toString()))
            );
    };
    
    function request(tools) { return { type: toolConstants.GETALL_REQUEST,tools } }
    function success(tools) { return { type: toolConstants.GETALL_SUCCESS, tools } }
    function failure(error) { return { type: toolConstants.GETALL_FAILURE, error } }
}