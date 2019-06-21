import React, { Component, Fragment} from 'react';
import Link from 'next/link';
import {assetsUrl} from '../../globalConstants';
import LazyLoad from 'react-lazy-load';
import styles from './index.css';
import Slider from "react-slick";


class Carousal extends Component { 
  render() {
    //console.log('*******************',this.props.data);
    return (
      <Fragment >
        <style jsx global>{styles} </style>      
          <h2 className='section-heading'>{this.props.heading}</h2>  
          {this.props.data && <SimpleSlider data= {this.props.data.results}/>}
      </Fragment>
    );
  }
}

class SimpleSlider extends React.Component {
  render() {
    const settings = {
      dots: true,
      lazyLoad: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4
    };
    const movies = this.props.data;

    const
      packagesSlider = movies.map( (movieInfo, index) => {
        return(
          <div key={index}>
            <MovieCard
              index={index}
              key={index}
              movieInfo={movieInfo}
            />
          </div>
        )
      })
    return (
      <Slider {...settings}>
        {packagesSlider}
      </Slider>
    );
  }
}

class MovieCard extends React.Component {
  render() {
    
    const movieInfo = this.props.movieInfo;
    return (
      <div className='movie-card'>
        <img className="movie-card-image" src={'https://image.tmdb.org/t/p/w500/' + movieInfo.backdrop_path}>
          
        </img>
        <div className='details'>
          <p className='movie-name'>{movieInfo.title}</p>
          <p className='movie-genre'></p>
          <div className='movie-rating'>
            <span className='rating-text'>{movieInfo.vote_average}</span>
          </div>

        </div>
      </div>
    );
  }
}

export default Carousal