import React, { Component } from 'react';
import Slider from 'rc-slider';
import store from '../../redux-state';
import FormContainer from '../form/form_container';
import TruebilStorage from '../../utility/truebil-storage';
import ArrowRight from '../../icons/arrow_right';
import IconCheck from '../../icons/icon_check';
import {unitConvertor, prepareLabel, dropGAPixel} from '../../helper';

export default class CarLoan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carLoanAmount: 450000,
      carLoanOpen : TruebilStorage.getItem('isAppliedForCarLoan') === 'true',
      showForm: false
    }
  }

  updateLoanValue = (carLoanAmount) => {
    const ele = document.querySelector('#carLoanSection .service-form-home-modal'),
      rcSliderHandle = document.querySelector('.rc-slider-handle'),
      sliderHandlePosition = rcSliderHandle.style.left;

    this.setState({
      carLoanAmount: carLoanAmount,
      showForm : true
    });

    //check if element exist 
    if (ele) {
     ele.classList.add('show-form');
    }

    this.tooltip.style.left = sliderHandlePosition;
    this.toggleOverlay = this.toggleOverlay.bind(this);
  }

  afterUpdateLoanValue = (carLoanAmount) => {
    this.updateLoanValue(carLoanAmount);
    dropGAPixel('newhome', 'moved_slider', prepareLabel(carLoanAmount, true), 0);
  }

  toggleOverlay() {
    this.setState({
      'showForm' : false
    });
    this.setState({
      'carLoanOpen' : !this.state.carLoanOpen
    });
  }

  render() {
    const defaultValue = 450000;
    const minLoanAmount = 100000;
    const maxLoanAmount = 1500000;
    const step = 50000;
    const railStyle = {
      height: '10px'
    }
    const trackStyle = {
      backgroundColor: '#29C5A3',
      height: '10px'
    }
    const handleStyle  = {
      border: '10px solid #29C5A3',
      backgroundColor: '#29C5A3',
      height: '24px',
      width: '24px',
      marginTop: '-7px',
      boxShadow: '4px 0 0 rgba(255,255,255,1), -4px 0 0 rgba(255,255,255,1)'
    }
    const inputs = [
      {name: 'name', isRequired: true},
      {name: 'mobile', isRequired: true}
    ],
    btnInfo = {
      type: 'submit',
      text: "Continue",
      classes: 'btn-pill btn-green-solid'
    },
    userInfo = store.getState().config.userInfo,
    hiddenInputs = {
      'loan_amount' : this.state.carLoanAmount,
      'city_id': userInfo['city_id']
    };

    return(
      <div>
        <section id='carLoanSection' className="home-section car-loan-wrap enabled">
          <h2 className="list-heading">Get best quotes for Used Car Loan</h2>
          { !this.state.carLoanOpen &&  
            <div className="slider-wraper">
              <div className="slider-tooltip-container">
                <div className="slider-tooltip-text" ref={(tooltip) => {this.tooltip = tooltip}}>
                  { '₹ ' + unitConvertor(this.state.carLoanAmount, true) }
                </div>
              </div>
              <Slider defaultValue={defaultValue} min={minLoanAmount} max={maxLoanAmount} step={step} onChange={this.updateLoanValue} onAfterChange={this.afterUpdateLoanValue} railStyle={railStyle} trackStyle={trackStyle} handleStyle={handleStyle} />
              <label className="min-loan-amount">1 Lakh</label>
              <label className="max-loan-amount">15 Lakh</label>
            </div>
          }
          { !this.state.carLoanOpen   && !this.state.showForm && 
            <div className="loan-form">
              <button type="button" className="btn btn-large btn-pill btn-green-solid carloan-btn js-carloan-btn disabled">
                Continue 
                <i className="arrow-right">
                  <ArrowRight />
                </i>
              </button>
            </div> 
          }
          { !this.state.carLoanOpen && this.state.showForm && 
            <LoanForm 
              service = {'carLoan'}
              inputs = {inputs}
              btnInfo = {btnInfo}
              hiddenInputs = {hiddenInputs}
              hideServiceModalForm = {this.toggleOverlay}
            />
          }
          { this.state.carLoanOpen 
            &&  <ThankYouLoanForm /> }  
        </section>
      </div>
    );
  }
}

class LoanForm extends Component {
  constructor(props) {
    super(props);

    this.postFormSubmit = this.postFormSubmit.bind(this);
  }

  async postFormSubmit() {
    var serviceName = this.props.service;
    await TruebilStorage.setItem('isAppliedFor' + serviceName.substr(0, 1).toUpperCase() + serviceName.substr(1), true);
    this.props.hideServiceModalForm();
    dropGAPixel('newhome', 'successfully_submitted_loan_form', prepareLabel('', true), 0);
  }

  render() {
    return (
      <div className="service-form-home-modal">
        <FormContainer
          inputs={this.props.inputs}
          hiddenInputs={this.props.hiddenInputs}
          btnInfo={this.props.btnInfo}
          showLockWrap={false}
          action={'users/loan_applicants/'}
          postFormSubmit={this.postFormSubmit} />
      </div>
    );
  }
}

class ThankYouLoanForm extends Component {
  render() {
    return (
      <div className="form-thankyou">
        <i className="icon-check">
          { <IconCheck />}
        </i>
        <span className="thankyou-text">Thank you!</span>
        <p className="thankyou-description">We've received your request regarding car loan. We will get back to you soon.
        </p>
    </div>
    );
  }
}
