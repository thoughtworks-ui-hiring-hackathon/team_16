import React, { Component } from 'react';
import {Link} from '../.././routes';
import { connect } from 'react-redux';
import TruebilStorage from '../../utility/truebil-storage';
import store from '../../redux-state';
import {fetchHomePageTrendingData} from './actions';
import {apiUrl} from '../../globalConstants';
import {apiKey} from '../../globalConstants';
import {fetchHomePageLatestData} from './latestActions';
import {fetchHomePageWatchedData} from './watchedActions';



import styles from './index.css';
import Carousal from '.././Carousal';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }


  componentDidMount() {
    const dataLoaded = this.props.dataLoaded;

    if (!dataLoaded) {
      store.dispatch(fetchHomePageTrendingData(null, store));
      // Load the home page data
    } 
    if(!this.props.latestdataLoaded) {
      store.dispatch(fetchHomePageLatestData(null, store)); 
    } 
    if(!this.props.watcheddataLoaded) {
      store.dispatch(fetchHomePageWatchedData(null, store)); 
    }   

  }


  render() {
   
    return(
      <div>
        <style jsx global>{styles} </style>
        <div className='all-content'>
          <div className='contents'>
            
          </div>
         <Carousal data={this.props.trendingData} heading='Trending'/>
         <Carousal data={this.props.latestData} heading='Latest'/> 
         <Carousal data={this.props.watchedData} heading='Most Watched'/> 


        </div>
      </div>     
    );
  }
}


export default Home;