import React from 'react';
import { connect } from 'react-redux';
import {fetchMovieData} from '../../components/Movie/actions';


import Movie from '../../components/Movie';

class Index extends React.Component {
  static async getInitialProps({store, isServer, query}, trackingInfo) {
    console.log(query);
    if (isServer || !store.getState().movie.dataLoaded) {
      await store.dispatch(fetchMovieData(isServer, store, query));
      
    }
    
  }


  render() {
    return (
      <Movie {...this.props} />
    );
  }
}

const mapStateToProps = state => console.log('kkkkkkkkkk', state.movie) || ({
  data: state.movie.data,
  loading: state.home.loading,
  dataLoaded: state.home.dataLoaded,
  error: state.home.error
});

export default connect(mapStateToProps)(Index);