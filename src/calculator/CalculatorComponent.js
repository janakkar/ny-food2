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
        this.state = {product: ProductService.createProductTemplate(), calculation: undefined};
        this.productTypes = ProductService.getProductTypes();
        this.grades = ['A', 'B', 'C', 'D', 'E'];
    }

    onAmountChange(type, index, value) {
        if (value) {
            let changedProduct = this.state.product.setIn([type, index, 'amount'], value);
            this.setState({product: changedProduct});
        }
    }

    createOnAmountChangeHandler(type, index) {
        return (event) => {
            this.onAmountChange(type, index, event.target.value);
        }
    }

    createIngredientsTab(ingredientsName) {
        return this.state.product.get(ingredientsName).map((ingredient, index) =>
            <AmountInput key={ingredient.get('type')} controlName={ingredient.get('type')} measure='g'
                         amount={ingredient.get('amount')}
                         onAmountChange={this.createOnAmountChangeHandler(ingredientsName, index)}/>)
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