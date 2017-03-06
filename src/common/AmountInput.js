import React, {Component} from "react";
import'./AmountInput.css';

const createId = (name) => {
    return 'field' + name;
};

export default class AmountInput extends Component {
    render() {
        const { controlName, amount, measure, onAmountChange, hasError } = this.props;

        return (
            <div className="row ">
                <label htmlFor={createId(controlName)}>{controlName}</label>
                <div className={`amount ${hasError ? 'error' : ''}`}>
                    <input type="number" step="0.1" id={createId(controlName)} value={amount}
                           onChange={onAmountChange}/>
                    <span className="measure">{measure}</span>
                </div>
            </div>
        );
    }
}

AmountInput.propTypes = {
    controlName: React.PropTypes.string,
    measure: React.PropTypes.string,
    amount: React.PropTypes.number,
    onAmountChange: React.PropTypes.func,
    hasError: React.PropTypes.bool
};