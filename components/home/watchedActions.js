import React from 'react';
import {updateConfig} from '../../globalActions';
import TruebilStorage from '../../utility/truebil-storage';
import {apiUrl} from '../../globalConstants';
import {apiKey} from '../../globalConstants';
import fetch from 'isomorphic-unfetch';


export const FETCH_HOMEPAGE_WATCHED_DATA_BEGIN   = 'FETCH_HOMEPAGE_WATCHED_DATA_BEGIN';
export const FETCH_HOMEPAGE_WATCHED_DATA_SUCCESS = 'FETCH_HOMEPAGE_WATCHED_DATA_SUCCESS';
export const FETCH_HOMEPAGE_WATCHED_DATA_FAILURE = 'FETCH_HOMEPAGE_WATCHED_DATA_FAILURE';

export function fetchHomePageWatchedData(isServer, store) {
  
  let apiLink = apiUrl;
  let actionName = 'movie/now_playing?api_key=';

  let query = apiLink + actionName + apiKey;
  console.log(query);

  return dispatch => {
    dispatch(fetchHomePageWatchedDataBegin());
    return fetch(query)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchHomePageWatchedDataSuccess(json));
        console.log(json);
        return json;
      })
      .catch(error => dispatch(fetchHomePageWatchedDataFailure(error)));
  };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export const fetchHomePageWatchedDataBegin = () => ({
  type: FETCH_HOMEPAGE_WATCHED_DATA_BEGIN
});

export const fetchHomePageWatchedDataSuccess = data => ({
  type: FETCH_HOMEPAGE_WATCHED_DATA_SUCCESS,
  payload: { data }
});

export const fetchHomePageWatchedDataFailure = error => ({
  type: FETCH_HOMEPAGE_WATCHED_DATA_FAILURE,
  payload: { error }
});