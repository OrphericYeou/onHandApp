import { combineReducers, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import userActions from './reducers/users.js';

const rootReducer = combineReducers({
    user: userActions
});

export const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
