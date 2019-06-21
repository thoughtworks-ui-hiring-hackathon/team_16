import {combineReducers} from 'redux'

import globalReducer from './globalReducers'
import homePageReducer from './components/home/reducers'

export default combineReducers({
  config: globalReducer,
  home: homePageReducer
})