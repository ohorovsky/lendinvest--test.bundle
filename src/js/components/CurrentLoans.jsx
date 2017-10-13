import React, { Component } from 'react';
import axios from 'axios';
import Loan from './Loan';
import Modal from './Modal';

export default class CurrentLoans extends Component {
	constructor(props){
		super(props);
		this.state = {
			currentLoans: [],
			total: null,
			isOpen: false
			
		}
		this.numberWithCommas = this.numberWithCommas.bind(this);
		this.toggleModal = this.toggleModal.bind(this);

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

	toggleModal(){
	    this.setState({
	      isOpen: !this.state.isOpen
	    });
	}

  render() {
    return (
      <div>
        {
			Object.keys(this.state.currentLoans).map(key => <Loan key={key} index={key} details={this.state.currentLoans[key]} toggleModal={this.toggleModal}/>)			
		}
		<div className="total">Total amount available for investments: <span>£{this.numberWithCommas(+this.state.total)}</span></div>
		<Modal show={this.state.isOpen} onClose={this.toggleModal}/>
      </div>
    );
  }
}
