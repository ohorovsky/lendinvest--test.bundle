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
			isOpen: false,
			activeLoan: null
		}
		this.numberWithCommas = this.numberWithCommas.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
		this.updateActiveLoan = this.updateActiveLoan.bind(this);
		this.updateTotal = this.updateTotal.bind(this);
		this.convertTime = this.convertTime.bind(this);


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

	updateActiveLoan(index){
		this.setState({
			activeLoan: index
		})
	}

	updateTotal(value){
		const updatedTotal = this.state.total - value;
		let currentLoans = [...this.state.currentLoans];
		const stringToNumber = parseFloat(currentLoans[this.state.activeLoan].amount.replace(/,/g, ''));
		currentLoans[this.state.activeLoan].amount = this.numberWithCommas(stringToNumber - value);
		this.setState({
			currentLoans,
			total: updatedTotal
		})
	}
	convertTime(seconds){
		const days = Math.floor(seconds / (24*60*60));
	    const daysms=seconds % (24*60*60);
	    const hours = Math.floor((daysms)/(60*60));
	    
	    
	    return `${days} Days ${hours} Hours`
	}

  render() {
    return (
      <div>
        {
			Object.keys(this.state.currentLoans).map(key => <Loan key={key} index={key} details={this.state.currentLoans[key]} convertTime={this.convertTime} toggleModal={this.toggleModal} updateActiveLoan={this.updateActiveLoan}/>)			
		}
		<div className="total">Total amount available for investments: <span>£{this.numberWithCommas(+this.state.total)}</span></div>
		<Modal show={this.state.isOpen} onClose={this.toggleModal} convertTime={this.convertTime} details={this.state.currentLoans[this.state.activeLoan]} updateTotal={this.updateTotal} />
      </div>
    );
  }
}
