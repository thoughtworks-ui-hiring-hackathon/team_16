import {
  FETCH_HOMEPAGE_LATEST_DATA_BEGIN,
  FETCH_HOMEPAGE_LATEST_DATA_SUCCESS,
  FETCH_HOMEPAGE_LATEST_DATA_FAILURE
} from './latestActions';

let initialState;
const self = global ? global : window;

if (self.__NEXT_DATA__) {
  initialState = self.__NEXT_DATA__.props.initialState.home
} else {
  initialState = {
    latestData: [],
    loading: false,
    dataLoaded: false,
    error: null
  };  
}

export default function homePageLatestReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_HOMEPAGE_LATEST_DATA_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        latestdataLoaded: false,
        error: null
      };

    case FETCH_HOMEPAGE_LATEST_DATA_SUCCESS:
      // All done: set loading "false".
      // Also, replace the data with the ones from the server
      console.log("---------------------",action.payload.data);
      return {
        ...state,
        loading: false,
        latestdataLoaded: true,
        latestData: action.payload.data
      };

    case FETCH_HOMEPAGE_LATEST_DATA_FAILURE:
      // The request failed, but it did stop, so set loading to "false".
      // Save the error, and we can display it somewhere
      // Since it failed, we don't have data to display anymore, so set it empty.
      return {
        ...state,
        loading: false,
        latestdataLoaded: false,
        error: action.payload.error,
        items: []
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}