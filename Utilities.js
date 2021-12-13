export default class
{
    /**
     * Make a range of numbers
     * @param {number} first
     * @param {number} last 
     * @returns {array}
     */
    static range(first, last)
    {
        return [...Array(last + 1).keys()].slice(first);
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
     * Remove duplicates from an array
     * @param {array} array The input array
     * @returns {array}
     */
    static arrayUnique(array)
    {
        const unique = [];

        for (let i = 0; i < array.length; i++) {
            if (unique.indexOf(array[i]) === -1) {
                unique.push(array[i]);
            }
        }

        return unique;
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
         return array.forEach((row, yIndex) =>
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
