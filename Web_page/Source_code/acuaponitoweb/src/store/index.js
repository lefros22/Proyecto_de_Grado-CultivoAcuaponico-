import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools} from 'redux-devtools-extension';
import think from 'redux-thunk';
import rootReducer from './reducers';

const middlewares=[ think];
const composeEnhancers = composeWithDevTools(
    applyMiddleware(...middlewares)
);


/**crear el store */
const store = createStore(rootReducer,composeEnhancers);

export default store;