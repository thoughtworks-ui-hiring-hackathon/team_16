import {combineReducers} from 'redux'

import globalReducer from './globalReducers'
import homePageReducer from './components/home/reducers'
import homePageLatestReducer from './components/home/latestReducers'
import movieReducer from './components/Movie/reducers'

import homePageWatchedReducer from './components/home/watchedReducers'



export default combineReducers({
  config: globalReducer,
  home: homePageReducer,
  movie: movieReducer,
  homeLatest: homePageLatestReducer,
  homeWatched: homePageWatchedReducer
})