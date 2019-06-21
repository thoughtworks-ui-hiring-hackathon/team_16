import {combineReducers} from 'redux'

import globalReducer from './globalReducers'
import homePageReducer from './components/home/reducers'
import homePageLatestReducer from './components/home/latestReducers'
import homePageWatchedReducer from './components/home/watchedReducers'



export default combineReducers({
  config: globalReducer,
  home: homePageReducer,
  homeLatest: homePageLatestReducer,
  homeWatched: homePageWatchedReducer
})