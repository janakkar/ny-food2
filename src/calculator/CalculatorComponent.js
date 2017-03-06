import React, {Component} from "react";
import AmountInput from "../common/AmountInput";
import {Dropdown} from "../common/Dropdown";
import {ProductService} from "../domain/ProductService";
import {GradeBadge} from "../common/GradeBadge";
import "./CalculatorComponent.css";

class CalculatorComponent extends Component {

    constructor(props) {
        super(props);
        this.onAmountChange = this.onAmountChange.bind(this);
        this.onProductTypeSelected = this.onProductTypeSelected.bind(this);
        this.onSave = this.onSave.bind(this);

        const product = ProductService.createProductTemplate();
        const badIngredients = {};
        product.get('badIngredients').forEach(ingredient => {badIngredients[ingredient.get('type')] = false});
        const goodIngredients = {};
        product.get('goodIngredients').forEach(ingredient => {goodIngredients[ingredient.get('type')] = false});

        this.state = {
            product: product,
            calculation: undefined,
            errors: {
                badIngredients: badIngredients,
                goodIngredients: goodIngredients
            }
        };
        this.productTypes = ProductService.getProductTypes();
        this.grades = ['A', 'B', 'C', 'D', 'E'];
    }

    validate(value) {
        return value < 0 || value > 1000;
    }

    onAmountChange(type, subtype, index, value) {
        if (value) {
            const changedProduct = this.state.product.setIn([type, index, 'amount'], value);
            let currentErrors = this.state.errors;
            currentErrors[type][subtype] = this.validate(value);

            this.setState({
                product: changedProduct,
                errors: currentErrors
            });
        }
    }

    createOnAmountChangeHandler(type, subtype, index) {
        return (event) => {
            this.onAmountChange(type, subtype, index, event.target.valueAsNumber);
        }
    }

    createIngredientsTab(ingredientsName) {
        return this.state.product.get(ingredientsName).map((ingredient, index) => {
            const type = ingredient.get('type');
            const amount = ingredient.get('amount');

            return (
                <AmountInput key={type} controlName={type} measure='g' amount={amount}
                             hasError={this.state.errors[ingredientsName][type]}
                             onAmountChange={this.createOnAmountChangeHandler(ingredientsName, type, index)}/>
            )
        })
    }

    onSave(event) {
        event.preventDefault();
        console.log(this.state.product.toJS());
    }

    onProductTypeSelected(item) {
        let changedProduct = this.state.product.set('productType', item);
        this.setState({product: changedProduct});
    }

    renderScore() {
        let panel;
        if (this.state.calculation !== undefined) {
            panel = <span className="score">Score: {this.state.calculation}</span>
        }
        return panel;
    }

    renderGradePanel() {
        return this.grades.map((grade, i) =>
            <GradeBadge key={grade} label={grade} showLine={i < this.grades.length - 1}/>
        );
    }

    render() {
        return (
            <div className='calculator'>
                <div className="grade-panel">
                    {this.renderScore()}
                    <div className="h-container">
                        {this.renderGradePanel()}

                    </div>
                </div>
                <form className="container">
                    <div className="row">
                        <label htmlFor="productName">Product</label>
                        <div className="h-container">
                            <input type="text" id="productName"/>
                            <input type="button" value="Compare"/>
                            <input type="button" value="Clear"/>
                            <input type="button" value="All Products"/>
                        </div>
                    </div>
                    <div className="row">
                        <label htmlFor="productType">Product type</label>
                        <Dropdown listItems={this.productTypes} onSelectItem={this.onProductTypeSelected}
                                  selectedItem={this.state.product.get('productType')}/>
                    </div>
                    <div className="h-container bad ingredients">
                        {this.createIngredientsTab('badIngredients')}
                    </div>
                    <div className="h-container good ingredients">
                        {this.createIngredientsTab('goodIngredients')}
                    </div>
                    <div className="row">
                        <input type="submit" value="Add" onClick={this.onSave}/>
                    </div>
                </form>
            </div>
        );
    }

}

export default CalculatorComponent;