import React, { Component, Fragment} from 'react';
import Link from 'next/link';
import {assetsUrl} from '../../globalConstants';
import LazyLoad from 'react-lazy-load';
import styles from './index.css';

class Header extends Component { 
  render() {
    return (
      <Fragment >
        <style jsx global>{styles} </style>
        <div className="header-universal">
          <ul className="header-elements">
            <li className="header-item">Movie App</li>
            <li className="header-item">Home</li>
            <li className="header-item">Explore</li>
          </ul>
        </div>
      </Fragment>
    );
  }
}

export default Header