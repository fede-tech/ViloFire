import { combineReducers } from 'redux';
import { basicReducer } from 'store/app/basicReducer';
import { donacionReducer } from 'store/donacion/donacionReducer';

const appReducer = combineReducers({
    basic: basicReducer,
    donacion: donacionReducer,
});

export default (state: any, action: any) => {
    return appReducer(state, action);
}
