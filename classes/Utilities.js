export default class Utilities
{
    /**
     * Make a range of numbers
     * @param {number} first
     * @param {number} last
     * @returns {array}
     */
    static range(first, last)
    {
        const min = Math.min(first, last);
        const max = Math.max(first, last);
        const range = [];

        for (let i = min; i <= max; i++) {
            range.push(i);
        }

        return range;
    }

    /**
     * See if a series of numbers are consecutive
     * @param {array|number} numbers
     * @return {boolean}
     */
    static numbersAreConsecutive(...numbers)
    {
        if (Array.isArray(numbers[0])) {
             numbers = numbers[0];
        }

        // See if numbers are ascending or descending
        const step = (numbers.at(-1) > numbers[0]) ? 1 : -1;

        for (let i = 1; i < numbers.length; i++) {
            if (numbers[i] !== numbers[i - 1] + step) {
                return false;
            }
        }

        return true;
    }

    /**
     * Like indexOf(), but finds all the indexes
     * @param {array} array The input array/string
     * @param {any} searchElement The item to search for
     * @param {number} fromIndex The index to start the search at
     * @returns {array}
     */
    static indexesOf(array, searchElement, fromIndex = 0)
    {
        const indexes = [];
        let index;

        while ((index = array.indexOf(searchElement, fromIndex)) !== -1) {
            indexes.push(index);
            fromIndex = index + 1;
        }

        return indexes;
    }

    /**
     * Find an item deeply nested in an array, by a list of indexes
     * @param {array} array The array to search in
     * @param {array} indexes Indexes to search with, recursively
     * @returns {any} Returns undefined if the item doesn't exist
     */
    static arrayDeepIndex(array, indexes)
    {
        let found = array;

        for (const index of indexes) {
            if (found[index] === undefined) {
                return undefined;
            }

            found = found[index];
        }

        return found;
    }

    /**
     * Insert/replace a value deeply into a multidimensional array
     * @param {array} array The array to set a value in
     * @param {array} indexes Indexes leading to the insertion point
     * @param {any} value The value to insert at that deep index
     * @returns {array}
     */
    static arraySetDeep(array, indexes, value)
    {
        let traverser = array;

        for (let i = 0; i < indexes.length; i++) {
            const index = indexes[i];

            // At the last index, place the value
            if (i === indexes.length - 1) {
                traverser[index] = value;
                return array;
            }

            // Create a child array if it doesn't exist
            if (! Array.isArray(traverser[index])) {
                traverser[index] = [];
            }

            traverser = traverser[index];
        }
    }

    /**
     * Like map(), but for 2D arrays
     * @param {array} array
     * @param {function} callback A function to apply on every item
     * @returns {array}
     */
    static map2D(array, callback)
    {
        return array.map((row, yIndex) =>
            row.map((element, xIndex) => callback(element, xIndex, yIndex, array)));
    }

    /**
     * Like forEach(), but for 2D arrays
     * @param {array} array
     * @param {function} callback A function to apply on every item
     * @returns {array}
     */
    static forEach2D(array, callback)
    {
        array.forEach((row, yIndex) =>
            row.forEach((element, xIndex) => callback(element, xIndex, yIndex, array)));
    }

    /**
     * Clone a value, useful for arrays and objects
     * @param {any} value The original value
     * @returns {any} A clone of the value
     */
    static clone(value)
    {
        return JSON.parse(JSON.stringify(value));
    }
}
