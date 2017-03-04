import React, {Component} from 'react';
import AmountInput from '../common/AmountInput';
import {ProductService} from '../domain/ProductService';

class CalculatorComponent extends Component {

    constructor(props) {
        super(props);
        this.onAmountChange = this.onAmountChange.bind(this);
        this.state = {product: ProductService.createProductTemplate()};
    }

    onAmountChange(type, index, value) {
        let changedProduct = this.state.product.setIn([type, index, 'amount'], value);
        this.setState({product: changedProduct});
        console.log({product: changedProduct});
    }

    createOnAmountChangeHandler(type, index) {
        return (event) => {
            this.onAmountChange(type, index, event.target.value);
        }
    }

    createIngredientsTab(ingredientsName) {
        return this.state.product.get(ingredientsName).map((ingredient, index) => {

            return (   <AmountInput key={ingredient.get('type')} controlName={ingredient.get('type')} measure='g'
                                    amount={ingredient.get('amount')}
                                    onAmountChange={this.createOnAmountChangeHandler(ingredientsName, index)}/>);
        });
    }

    render() {
        return (
            <div className='calculator'>
                <p>{JSON.stringify(this.state.product.toJS())}</p>

                {this.createIngredientsTab('badIngredients')}

                {this.createIngredientsTab('goodIngredients')}

            </div>
        );
    }

}

export default CalculatorComponent;