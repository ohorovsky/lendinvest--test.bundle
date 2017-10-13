import React, { Component } from 'react';


export default class Loan extends Component {

  render() {
  	const details = this.props.details;
    return (
      <div className="loan">
        <h2 className="loan-title">{details.title}</h2>
        <ul className="loan-details">
        	<li>Total amount : £{details.amount}</li>
        	<li>Tranche : {details.tranche}</li>
        	<li>Annual return : {details.annualised_return}</li>
        	<li>Loan ends in : {this.props.convertTime(details.term_remaining)}</li>
        	<li>Loan-to-value : {details.ltv}</li>

        </ul>
        <button className="loan-button" 
        		onClick={() => {
        			this.props.updateActiveLoan(this.props.index); 
        			this.props.toggleModal()
        		}}>Invest in Loan
        </button>
      </div>
    );
  }
}
