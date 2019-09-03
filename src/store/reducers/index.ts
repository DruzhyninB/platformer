import {combineReducers} from 'redux';

import init from './init.reducer';
import platformer from 'pages/Platformer/store/reducers'

import {reducer as toastrReducer} from 'ultumus-react-redux-toastr'

const rootReducer = combineReducers({
    init,
    platformer,
    toastr: toastrReducer
});

export default rootReducer;
