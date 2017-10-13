import React, { Component } from 'react';


export default class Loan extends Component {
	constructor(props){
	      super(props);
	      
	      this.convertTime = this.convertTime.bind(this);
	  }
	convertTime(seconds){
		const days = Math.floor(seconds / (24*60*60));
	    const daysms=seconds % (24*60*60);
	    const hours = Math.floor((daysms)/(60*60));
	    
	    
	    return `${days} Days ${hours} Hours`
	}
  render() {
  	const details = this.props.details;
    return (
      <div className="loan">
        <h2 className="loan-title">{details.title}</h2>
        <ul className="loan-details">
        	<li>Total amount : £{details.amount}</li>
        	<li>Tranche : {details.tranche}</li>
        	<li>Annual return : {details.annualised_return}</li>
        	<li>Loan ends in : {this.convertTime(details.term_remaining)}</li>
        	<li>Loan-to-value : {details.ltv}</li>

        </ul>
        <button className="loan-button" 
        		onClick={() => {
        			this.props.toggleModal()
        		}}>Invest in Loan
        </button>
      </div>
    );
  }
}
