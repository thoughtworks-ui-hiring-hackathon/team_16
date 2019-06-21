import React from 'react';
import {updateConfig} from '../../globalActions';
import TruebilStorage from '../../utility/truebil-storage';
import {apiUrl} from '../../globalConstants';
import {apiKey} from '../../globalConstants';
import fetch from 'isomorphic-unfetch';


export const FETCH_HOMEPAGE_LATEST_DATA_BEGIN   = 'FETCH_HOMEPAGE_LATEST_DATA_BEGIN';
export const FETCH_HOMEPAGE_LATEST_DATA_SUCCESS = 'FETCH_HOMEPAGE_LATEST_DATA_SUCCESS';
export const FETCH_HOMEPAGE_LATEST_DATA_FAILURE = 'FETCH_HOMEPAGE_LATEST_DATA_FAILURE';

export function fetchHomePageLatestData(isServer, store) {
  
  let apiLink = apiUrl;
  let actionName = 'movie/now_playing?api_key=';

  let query = apiLink + actionName + apiKey;
  console.log(query);

  return dispatch => {
    dispatch(fetchHomePageLatestDataBegin());
    return fetch(query)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchHomePageLatestDataSuccess(json));
        console.log(json);
        return json;
      })
      .catch(error => dispatch(fetchHomePageLatestDataFailure(error)));
  };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export const fetchHomePageLatestDataBegin = () => ({
  type: FETCH_HOMEPAGE_LATEST_DATA_BEGIN
});

export const fetchHomePageLatestDataSuccess = data => ({
  type: FETCH_HOMEPAGE_LATEST_DATA_SUCCESS,
  payload: { data }
});

export const fetchHomePageLatestDataFailure = error => ({
  type: FETCH_HOMEPAGE_LATEST_DATA_FAILURE,
  payload: { error }
});