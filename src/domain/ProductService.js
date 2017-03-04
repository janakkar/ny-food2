import {Map, List} from "immutable";
import {CALORIES, SATURATED_FATS, SIMPLE_SUGARS, SALT, NATURAL, FIBRE, PROTEIN} from "../domain/Ingredient";


const immutable = (product) => {

    product.badIngredients = List(product.badIngredients.map(i => Map(i)));
    product.goodIngredients = List(product.goodIngredients.map(i => Map(i)));
    return  Map(product);
};

export class ProductService {
    static createProductTemplate() {
        return immutable({
            name: '',
            productType: '',
            badIngredients: [{type: CALORIES, amount: 0},
                {type: SATURATED_FATS, amount: 0},
                {type: SIMPLE_SUGARS, amount: 0},
                {type: SALT, amount:455}],
            goodIngredients: [{type: NATURAL, amount: 0},
                {type: FIBRE, amount: 0},
                {type: PROTEIN, amount: 0}]
        });
    }

}