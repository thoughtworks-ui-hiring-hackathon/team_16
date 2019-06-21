import {
  FETCH_MOVIE_DATA_BEGIN,
  FETCH_MOVIE_DATA_SUCCESS,
  FETCH_MOVIE_DATA_FAILURE
} from './actions';

let initialState;
const self = global ? global : window;

if (self.__NEXT_DATA__) {
  initialState = self.__NEXT_DATA__.props.initialState.home
} else {
  initialState = {
    data: [],
    loading: false,
    dataLoaded: false,
    error: null
  };  
}

export default function movieReducer(state = initialState, action) {
  switch(action.type) {
    case FETCH_MOVIE_DATA_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        dataLoaded: false,
        error: null
      };

    case FETCH_MOVIE_DATA_SUCCESS:
      // All done: set loading "false".
      // Also, replace the data with the ones from the server
      return {
        ...state,
        loading: false,
        dataLoaded: true,
        data: action.payload.data
      };

    case FETCH_MOVIE_DATA_FAILURE:
      // The request failed, but it did stop, so set loading to "false".
      // Save the error, and we can display it somewhere
      // Since it failed, we don't have data to display anymore, so set it empty.
      return {
        ...state,
        loading: false,
        dataLoaded: false,
        error: action.payload.error,
        items: []
      };

    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}