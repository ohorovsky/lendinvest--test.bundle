import React, { Component } from 'react';
import axios from 'axios';
import Loan from './Loan';


export default class CurrentLoans extends Component {
	constructor(props){
		super(props);
		this.state = {
			currentLoans: [],
			total: null
			
		}
		this.numberWithCommas = this.numberWithCommas.bind(this);

	}

	componentWillMount() {
		this.getData();
		
	}

	
	getData() {
		axios.get('/src/current-loans.json',{
	      withCredentials: true
	    })
	    .then((response) => {
	    	let total = 0;
	    	response.data.loans.forEach(loan => total += parseFloat(loan.available.replace(/,/g, '')));
	    	this.setState({
	    		currentLoans: response.data.loans,
	    		total: total
	    	})

	    	
	    })
	    .catch((error) => {
	      	console.log(error);
	    });
	}

	numberWithCommas(x) {
	    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
  render() {
    return (
      <div>
        {
			Object.keys(this.state.currentLoans).map(key => <Loan key={key} index={key} details={this.state.currentLoans[key]} toggleModal={this.toggleModal} updateActiveLoan={this.updateActiveLoan}/>)			
		}
		<div className="total">Total amount available for investments: <span>£{this.numberWithCommas(+this.state.total)}</span></div>
		
      </div>
    );
  }
}
