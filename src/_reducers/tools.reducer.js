import { toolActions } from '../_actions/tool.actions';
import {toolConstants} from '../_constants';

export const tools = (state = {}, action) => {
    switch (action.type) {
        case toolConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case toolConstants.GETALL_SUCCESS:
            return {
                items: action.tools
            };
        case toolConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}