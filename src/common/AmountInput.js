import React, {Component} from "react";
import'./AmountInput.css';

const createId = (name) => {
    return 'field' + name;
};

export default class AmountInput extends Component {
    render() {
        return (
            <div className="row ">
                <label htmlFor={createId(this.props.controlName)}>{this.props.controlLabel}</label>
                <div className="amount">
                    <input type="number" step="0.1" id={createId(this.props.controlName)} value={this.props.amount}
                           onChange={this.props.onAmountChange}/>
                    <span className="measure">{this.props.measure}</span>
                </div>
            </div>
        );
    }
}

AmountInput.propTypes = {
    controlLabel: React.PropTypes.string,
    controlName: React.PropTypes.string,
    measure: React.PropTypes.string,
    amount: React.PropTypes.number
};