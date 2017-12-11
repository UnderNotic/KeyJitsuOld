import {createStore, combineReducers} from 'redux';
import mainReducer from 'containers/Main/indexDuck';

export default function configureStore(){
    const reducers = combineReducers({
        mainReducer
    });
    return createStore(reducers);
}