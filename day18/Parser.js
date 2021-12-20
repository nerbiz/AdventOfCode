import Utilities from '../Utilities.js';

export default class
{
    constructor() {
        // Fix "'this' is undefined" error
        this.createNumberObject = this.createNumberObject.bind(this);
    }

    /**
     * Convert a pair (array) to an object with more properties
     * @param {any} item The item to make an object of (or recurse into if it's an array)
     * @param {number} currentIndex The location of the item in its parent
     * @param {array} deepIndexes Multidimensional indexes of the item
     * @returns {object}
     */
    createNumberObject(item, currentIndex, deepIndexes = []) {
        deepIndexes = Utilities.clone(deepIndexes);
        deepIndexes.push(currentIndex);

        // The item is not an array, return a regular number object
        if (! Array.isArray(item)) {
            return {value: item, deepIndexes};
        }

        // Recursively create an object
        return item.map((childItem, childIndex) => this.createNumberObject(childItem, childIndex, deepIndexes));
    }

    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {object}
     */
    parse(linesArray)
    {
        return linesArray.map(line => JSON.parse(line)
            .map((item, itemIndex) => this.createNumberObject(item, itemIndex))
        );
    }
}
