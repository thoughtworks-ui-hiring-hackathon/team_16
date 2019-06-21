import React from 'react';
import {updateConfig} from '../../globalActions';
import TruebilStorage from '../../utility/truebil-storage';
import {apiUrl} from '../../globalConstants';
import {apiKey} from '../../globalConstants';
import fetch from 'isomorphic-unfetch';


export const FETCH_HOMEPAGE_TRENDING_DATA_BEGIN   = 'FETCH_HOMEPAGE_TRENDING_DATA_BEGIN';
export const FETCH_HOMEPAGE_TRENDING_DATA_SUCCESS = 'FETCH_HOMEPAGE_TRENDING_DATA_SUCCESS';
export const FETCH_HOMEPAGE_TRENDING_DATA_FAILURE = 'FETCH_HOMEPAGE_TRENDING_DATA_FAILURE';

export function fetchHomePageTrendingData(isServer, store) {
  
  let apiLink = apiUrl;
  let actionName = 'trending/movie/week?api_key=';

  let query = apiLink + actionName + apiKey;
  console.log(query);


  return dispatch => {
    dispatch(fetchHomePageTrendingDataBegin());
    return fetch(query)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchHomePageTrendingDataSuccess(json));
        return json;
      })
      .catch(error => dispatch(fetchHomePageTrendingDataFailure(error)));
  };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export const fetchHomePageTrendingDataBegin = () => ({
  type: FETCH_HOMEPAGE_TRENDING_DATA_BEGIN
});

export const fetchHomePageTrendingDataSuccess = data => ({
  type: FETCH_HOMEPAGE_TRENDING_DATA_SUCCESS,
  payload: { data }
});

export const fetchHomePageTrendingDataFailure = error => ({
  type: FETCH_HOMEPAGE_TRENDING_DATA_FAILURE,
  payload: { error }
});