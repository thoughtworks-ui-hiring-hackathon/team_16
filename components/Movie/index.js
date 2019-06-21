import React, { Component } from 'react';
import {Link} from '../.././routes';
import { connect } from 'react-redux';
import TruebilStorage from '../../utility/truebil-storage';
import store from '../../redux-state';
import {apiUrl} from '../../globalConstants';
// import {fetchMovieData} from './actions';
import {apiKey} from '../../globalConstants';




import styles from './index.css';

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }


  // componentDidMount() {
  //   const dataLoaded = this.props.dataLoaded;

  //   if (!dataLoaded) {
  //     store.dispatch(fetchMovieData(null, store));
  //     // Load the home page data
  //   }    

  // }


  render() {
   console.log(this.props);
    return(
      <div>
        <style jsx global>{styles} </style>
        <span>{JSON.stringify(this.props.data)}</span>
      </div>     
    );
  }
}


export default Movie;