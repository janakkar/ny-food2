/**
 * Good ingredients.
 */
export const NATURAL = 'Natural';
export const FIBRE = 'Fibre';
export const PROTEIN = 'Protein';
/**
 * Bad ingredients.
 */
export const CALORIES = 'Calories';
export const SATURATED_FATS = 'Fats';
export const SIMPLE_SUGARS = 'Sugar';
export const SALT = 'Salt';

export const GOOD = {
    [NATURAL]: 0,
    [FIBRE]: 1,
    [PROTEIN]: 2
};

export const BAD = {
    [CALORIES]: 0,
    [SATURATED_FATS]: 1,
    [SIMPLE_SUGARS]: 2,
    [SALT]: 3
};

export class Ingredient {
    constructor(type, amount) {
        this.type = type;
        this.amount = amount;
    }
}
