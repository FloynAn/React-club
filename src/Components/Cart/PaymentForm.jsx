import { Button } from '@mui/material';
import React from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { Link } from 'react-router-dom';

export default class PaymentForm extends React.Component {
  state = {
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
  };
 
  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  }
  
  handleInputChange = (e) => {
    const { name, value } = e.target;
    
    this.setState({ [name]: value });
  }


  
  render() {
    localStorage.clear()
    return (
      <div id="PaymentForm">
        <Cards
          cvc={this.state.cvc}
          expiry={this.state.expiry}
          focused={this.state.focus}
          name={this.state.name}
          number={this.state.number}
        />
        <form style={{display:'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px', flexDirection: 'column'}}>
        	<input
            type="tel"
            name="number"
            placeholder="Номер карты"
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
            style={{ margin: '10px'}}
          />
          <input
            type="text"
            name="name"
            placeholder="Ваше имя"
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
            style={{ margin: '10px'}}
          />
          <input
            type="tel"
            name="expiry"
            placeholder="Срок действия"
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
            style={{ margin: '10px'}}
          />
          <input
            type="tel"
            name="cvc"
            placeholder="CVC"
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
            style={{ margin: '10px'}}
          />
          <Link to='/' style={{textDecoration:'none'}}>
            <Button 
              style={{teaxtAlign: 'center', marginTop: '10px'}} 
              variant='contained' color='warning'
              >
                Оплатить
              </Button>
          </Link>
        </form>
      </div>
    );
  }
}