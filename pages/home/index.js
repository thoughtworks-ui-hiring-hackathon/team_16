import React from 'react';
import { connect } from 'react-redux';
import {fetchHomePageData} from '../../components/home/actions';
import Home from '../../components/home';

class Index extends React.Component {
  static async getInitialProps({store, isServer}, trackingInfo) {
    if (isServer || !store.getState().home.dataLoaded) {
      await store.dispatch(fetchHomePageData(isServer, store));
    }
  }

  render() {
    return (
      <Home {...this.props} />
    );
  }
}

const mapStateToProps = state => ({
  data: state.home.data,
  loading: state.home.loading,
  dataLoaded: state.home.dataLoaded,
  error: state.home.error,
  config: state.config
});

export default connect(mapStateToProps)(Index);