import React from 'react';
import { connect } from 'react-redux';
import {fetchHomePageTrendingData} from '../../components/home/actions';
import {fetchHomePageLatestData} from '../../components/home/latestActions';
import {fetchHomePageWatchedData} from '../../components/home/watchedActions';

import Home from '../../components/home';

class Index extends React.Component {
  static async getInitialProps({store, isServer}, trackingInfo) {
    if (isServer || !store.getState().home.dataLoaded) {
      await store.dispatch(fetchHomePageTrendingData(isServer, store));
      
    }
    if (isServer || !store.getState().homeLatest.latestdataLoaded) {
      await store.dispatch(fetchHomePageLatestData(isServer, store));
    }
    if (isServer || !store.getState().homeWatched.watcheddataLoaded) {
      await store.dispatch(fetchHomePageWatchedData(isServer, store));
    }
  }


  render() {
    return (
      <Home {...this.props} />
    );
  }
}

const mapStateToProps = state => console.log('00000000000', state.homeWatched) || ({
  trendingData: state.home.trendingData,
  latestData: state.homeLatest.latestData,
  watchedData: state.homeWatched.watchedData,
  latestdataLoaded: state.homeLatest.latestdataLoaded,
  loading: state.home.loading,
  dataLoaded: state.home.dataLoaded,
  error: state.home.error
});

export default connect(mapStateToProps)(Index);