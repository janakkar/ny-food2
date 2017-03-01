import {BAD, GOOD, PROTEIN} from "../domain/Ingredient";

const bad = [
    [335, 1, 4.5, 90],
    [335, 1, 4.5, 90],
    [670, 2, 9, 180],
    [1005, 3, 13.5, 270],
    [1340, 4, 18, 360],
    [1675, 5, 22.5, 450],
    [2010, 6, 27, 540],
    [2345, 7, 31, 630],
    [2680, 8, 36, 720],
    [3015, 9, 40, 810],
    [2350, 10, 45, 900]
];

const good = [
    [40, 0.9, 1.6],
    [40, 0.9, 1.6],
    [60, 1.9, 3.2],
    [65, 2.8, 4.8],
    [70, 3.7, 6.4],
    [80, 4.7, 8]
];

class IngredientThreshold {

    constructor(grade, threshold, upperLimit) {
        this.grade = grade;
        this.threshold = threshold;
        this.upperLimit = upperLimit;
    }

    checkThreshold(ingredient) {
        return this.upperLimit ? this.threshold >= ingredient.amount : this.threshold < ingredient.amount;
    }

}

const sum = (a, b) => a + b;

const initThresholds = (ingredients, thresholds) => {

    return Object.keys(ingredients).map(type => ingredients[type])
        .map(i => thresholds.map((row, j) => new IngredientThreshold(j, row[i], j === 0)));
};

const badIngredients = initThresholds(BAD, bad);
const goodIngredients = initThresholds(GOOD, good);

export class Calculator {

    calculateForIngredient(ingredient) {
        const thresholds = GOOD[ingredient.type] !== undefined ? goodIngredients : badIngredients;
        const key = GOOD[ingredient.type] !== undefined ? GOOD[ingredient.type] : BAD[ingredient.type];
        return thresholds[key].filter(t => t.checkThreshold(ingredient)).reverse()[0].grade;
    }

    calculate(product) {
        let goodPoints = product.goodIngredients.map(this.calculateForIngredient).reduce(sum, 0);
        const badPoints = product.badIngredients.map(this.calculateForIngredient).reduce(sum, 0);

        if (badPoints > 10 && goodPoints < 5) {
            goodPoints = product.goodIngredients.filter(ingredient => ingredient.type !== PROTEIN)
                .map(this.calculateForIngredient).reduce(sum, 0);
        }
        return badPoints - goodPoints;
    }

    assignGrade(score) {
        if (score <= 4) {
            return 'A';
        } else if (score > 4 && score <= 8) {
            return 'B';
        } else if (score > 8 && score <= 16) {
            return 'C';
        } else if (score > 16 && score <= 32) {
            return 'D';
        } else {
            return 'E';
        }
    }
}