import {Calculator} from "./Calculator";
import {CALORIES, SATURATED_FATS, SIMPLE_SUGARS, SALT, PROTEIN} from "../domain/Ingredient";

const calculator = new Calculator();

it('should calculate score for show case products', () => {
    // given
    const kefir = {
        name: 'Kefir', productType: 'Dairy', badIngredients: [
            {type: CALORIES, amount: 41},
            {type: SATURATED_FATS, amount: 0.6},
            {type: SIMPLE_SUGARS, amount: 4.8},
            {type: SALT, amount: 100}
        ],
        goodIngredients: [
            {type: PROTEIN, amount: 3.6}]
    };

    const yogurt = {
        name: 'Yogurt', productType: 'Dairy', badIngredients: [
            {type: CALORIES, amount: 67},
            {type: SATURATED_FATS, amount: 1.7},
            {type: SIMPLE_SUGARS, amount: 5.8},
            {type: SALT, amount: 200}
        ],
        goodIngredients: [
            {type: PROTEIN, amount: 4.1}]
    };

    // when
    const gradeKefir = calculator.calculate(kefir);
    const gradeYogurt = calculator.calculate(yogurt);

    // then
    expect(calculator).toBeTruthy();
    expect(gradeKefir).toBe(0);
    expect(gradeYogurt).toBe(2);
});
