import { createStore } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'

const store = createStore(reducer);

export default store