
import pollsReducer from '@Reducers/Polls';
import { combineReducers } from 'redux';

const itemsReducer = () => ({});

export default () => combineReducers({
  items: itemsReducer,
  polls: pollsReducer,
});
