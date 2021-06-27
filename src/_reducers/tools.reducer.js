import { toolActions } from '../_actions/tool.actions';
import {toolConstants} from '../_constants';

export const tools = (state = [], action) => {
    switch (action.type) {
        case toolConstants.GETALL_REQUEST:
            return action.payload
        case toolConstants.DELETE_TOOL:
            return action.payload
        case toolConstants.CLEAR_TOOLS:
            return action.payload
        default:
            return state
    }
}
/* import { toolActions } from '../_actions/tool.actions';
import {toolConstants} from '../_constants';

export const tools = (state = {}, action) => {
    switch (action.type) {
        case toolConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case toolConstants.GETALL_SUCCESS:
            return {
                tools: action.tools
            };
        case toolConstants.GETALL_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
} */