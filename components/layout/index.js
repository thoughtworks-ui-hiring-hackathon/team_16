import React, { Fragment }  from 'react';
import {Router} from '../.././routes';
import store from '../../redux-state.js';
import Cookies from 'js-cookie';
import TruebilStorage from '../../utility/truebil-storage';
import {setConfig, updateConfig} from '../../globalActions';
import {openModal, closeModal} from '../modal/actions';
import styles from './common.css';
import resetStyles from './reset.css';
import rcSliderStyles from 'rc-slider/assets/index.css';
import {assetsUrl, razorpayUrl, ravenLibUrl, ravenKey} from '../.././globalConstants';
import Header from '.././Header';
import slickStyles1 from "slick-carousel/slick/slick.css";
import slickStyles2 from "slick-carousel/slick/slick-theme.css";

export default class extends React.Component {
  constructor(props) {
    super(props);
    var lastScroll;
    var deferredPrompt;
  }

  componentDidMount() {
   
    
  }
 
  handleRouteChangeComplete = url => {
    TruebilStorage.setItem('overlayNumber', 0);
    closeModal({ isMoreClicked: false });
    document.body.classList.remove('overflow-hidden');
  }

  /**
    * App initialization
    */

  popstateEventHandler = (hashURL) => {
    var obj = {};
    var oldURL = hashURL.oldURL;
    var newURL = hashURL.newURL;
    var oldURLHash = oldURL.split('#')[1];
    var newURLHash = newURL.split('#')[1];
    if (oldURLHash === 'razorpay') {
      document.getElementsByClassName('razorpay-container')[0].style.display = 'none';
      document.body.style = '';
      return;
    }
    if (oldURLHash) {
      if (oldURLHash === 'makeOffer') {
        store.dispatch({type: 'MAKE_OFFER', open: false, showThankYou: false, showForm: false,showVerify: false });
      } else if (oldURLHash === 'showAlbum') {
        store.dispatch({type: 'GALLERY', showAlbum: false, showTyres: false, showSampleErrors: false, scrollToCaption: ''});
      } else if (oldURLHash === 'showCarousel') {
        obj[oldURLHash] = false;
        obj['showImgList'] = true;
        closeModal(obj);
      } else {
        obj[oldURLHash] = false;
        closeModal(obj);
      }
    }
    if (newURLHash) {
      obj[newURLHash] = true;
      openModal(obj);
    }
  }

  componentWillUnmount() {
    const classObj = this;
    window.removeEventListener('hashchange', function(hashURL) {
      classObj.popstateEventHandler(hashURL);
    });
    window.removeEventListener('load', this.loadScriptsOnPageLoad);
    window.removeEventListener('scroll', this.handleScroll);
  }
  
  render() {
    const route = this.props.children.props.router.route.split('/')[1];
    const isShowNavBar = !['dedicated'].includes(route);

    return (
      <Fragment>
        <style jsx global>{ resetStyles } </style>
        <style jsx global>{ styles } </style>
        <style jsx global>{ slickStyles1 } </style>
        <style jsx global>{ slickStyles2 } </style>
        <style jsx global>{ styles } </style>

        <Header />
        {this.props.children}  
      </Fragment>
    );
  }
}