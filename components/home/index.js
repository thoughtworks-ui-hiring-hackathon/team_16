import React, { Component } from 'react';
import {Link} from '../.././routes';
import { connect } from 'react-redux';
import TruebilStorage from '../../utility/truebil-storage';
import {unitConvertor, toggleShortlist, wave, prepareLabel, dropGAPixel, sendGA, sendPageView, setGADimension} from '../../helper';
import store from '../../redux-state';
import {fetchHomePageData} from './actions';
import {updateConfig} from '../../globalActions';
import styles from './index.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state  = {
     
    }
  }

  render() {
    

    return(
      <div>
        <style jsx global>{styles} </style>
        Here
      </div>     
    );
  }
}


export default Home;