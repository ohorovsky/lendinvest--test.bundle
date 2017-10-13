import React from 'react';
import PropTypes from 'prop-types';

export default class Modal extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        inputValue: null
      }
  }

  updateInputValue(e) {
      this.setState({
        inputValue: e.target.value
      });
    }

  render() {
    if(!this.props.show) {
      return null;
    }
    const details = this.props.details;
    return (
      <div className="backdrop">
        <div className="modal loan">
          <div className="close-button" onClick={this.props.onClose}>&times;</div>
          <div className="modal-title loan-title">{details.title}</div>
          <ul className="loan-details">
            <li>Total amount : £{details.amount}</li>
            <li>Annual return : {details.annualised_return}</li>
            <li>Loan ends in : {this.props.convertTime(details.term_remaining)}</li>
          </ul>
          <div className="footer">
            
            <form action="">
              <label htmlFor="number">Investment amount (£)</label>
              <input type="number" id="number" placeholder="Loan" onChange={e => this.updateInputValue(e)} />
              <input className="form-button" type="button" value="Invest Now" onClick={() => {this.props.updateTotal(this.state.inputValue); this.props.onClose()}} />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};
