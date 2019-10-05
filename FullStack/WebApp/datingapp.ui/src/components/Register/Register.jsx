import React, { Fragment } from 'react';
import Joi from 'joi-browser';
import { withRouter } from 'react-router-dom';

import Form from '../UI/Form';
import Calendar from 'react-calendar';
import Button from '../UI/Button';
import auth from '../../services/authService.js';
import alertify from 'alertifyjs';
class Register extends Form {
  state = {
    date: new Date(),
    formatDate: '',
    gender: 'male',
    selectedOption: 'male',
    data: {
      gender: '',
      username: '',
      knownAs: '',
      dateOfBirth: new Date(),
      city: '',
      country: '',
      password: '',
      confirmPassword: ''
    },
    errors: {}
  };

  schema = {
    gender: Joi.required(),
    username: Joi.string()
      .required()
      .label('Username'),
    knownAs: Joi.string().label('Known As'),
    dateOfBirth: Joi.any(),
    city: Joi.string().label('City'),
    country: Joi.string().label('Country'),
    password: Joi.string()
      .min(4)
      .max(8)
      .label('Password'),
    confirmPassword: Joi.any()
      .valid(Joi.ref('password'))
      .required()
      .options({ language: { any: { allowOnly: 'must match Password' } } })
      .label('Password confirmation')
  };

  handleOptionChange = e => {
    let gender = e.target.value;
    this.setState({ selectedOption: gender, gender });
  };

  handleOnChangeDate = date => {
    this.setState({ date, formatDate: date.toLocaleDateString() });
  };

  doSubmit = () => {
    let user = { ...this.state.data };
    user.gender = this.state.gender;
    user.dateOfBirth = this.state.date;

    try {
      auth.register(user);
      alertify.success('The user was register');
      this.props.history.push('/members');
    } catch (error) {
      alertify.error(error);
    }
  };

  render() {
    return (
      <Fragment>
        <h2 className='text-center text-primary'>Sign Up</h2>
        <hr />
        <form onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label className='control-label' style={{ marginRight: '10px' }}>
              I am a:
            </label>
            <div className='custom-control custom-radio custom-control-inline'>
              <input
                type='radio'
                id='maleRadio'
                name='radio1'
                className='custom-control-input'
                value='male'
                checked={this.state.selectedOption === 'male'}
                onChange={e => this.handleOptionChange(e)}
              />
              <label className='custom-control-label' htmlFor='maleRadio'>
                Male
              </label>
            </div>
            <div className='custom-control custom-radio custom-control-inline'>
              <input
                type='radio'
                id='femaleRadio'
                name='radio2'
                className='custom-control-input'
                value='female'
                checked={this.state.selectedOption === 'female'}
                onChange={e => this.handleOptionChange(e)}
              />
              <label className='custom-control-label' htmlFor='femaleRadio'>
                Female
              </label>
            </div>
          </div>
          {this.renderInput('username', 'Username')}
          {this.renderInput('knownAs', 'Known As')}
          <label>Date of Birth</label>
          <Calendar
            onChange={this.handleOnChangeDate}
            value={this.state.date}
          />
          <input
            type='text'
            className='form-control'
            value={this.state.formatDate}
            readOnly
          />
          <br />
          {this.renderInput('city', 'City')}
          {this.renderInput('country', 'Country')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderInput('confirmPassword', 'Confirm Password', 'password')}
          <div className='form-group text-center'>
            {this.renderButton('Register', 'btn-primary')}
            <Button bsClasses='btn-secondary' clicked={this.props.onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </Fragment>
    );
  }
}

export default withRouter(Register);
