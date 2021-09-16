import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { user } from './users.reducer';
import { alert } from './alert.reducer';
import { tools } from './tools.reducer';

const rootReducer = combineReducers({
  authentication,
  user,
  alert,
  tools,
});

export default rootReducer;