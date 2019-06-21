import React from 'react';
import {updateConfig} from '../../globalActions';
import TruebilStorage from '../../utility/truebil-storage';
import {apiUrl} from '../../globalConstants';
import {apiKey} from '../../globalConstants';
import fetch from 'isomorphic-unfetch';


export const FETCH_MOVIE_DATA_BEGIN   = 'FETCH_MOVIE_DATA_BEGIN';
export const FETCH_MOVIE_DATA_SUCCESS = 'FETCH_MOVIEDATA_SUCCESS';
export const FETCH_MOVIE_DATA_FAILURE = 'FETCH_MOVIE_DATA_FAILURE';

export function fetchMovieData(isServer, store, q) {
  
  let apiLink = apiUrl;
  let movieId = q.id;
  console.log(q);
  let actionName = 'movie/'+ movieId +'?api_key=';

  let query = apiLink + actionName + apiKey;
  console.log(query);


  return dispatch => {
    dispatch(fetchMovieDataBegin());
    return fetch(query)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchMovieDataSuccess(json));
        return json;
      })
      .catch(error => dispatch(fetchMovieDataFailure(error)));
  };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export const fetchMovieDataBegin = () => ({
  type: FETCH_MOVIE_DATA_BEGIN
});

export const fetchMovieDataSuccess = data => ({
  type: FETCH_MOVIE_DATA_SUCCESS,
  payload: { data }
});

export const fetchMovieDataFailure = error => ({
  type: FETCH_MOVIE_DATA_FAILURE,
  payload: { error }
});