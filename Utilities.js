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
        const min = Math.min(first, last);
        const max = Math.max(first, last);
        const range = [];

        for (let i = min; i <= max; i++) {
            range.push(i);
        }
        
        return range;
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
     * Counts the occurrences of values in an array
     * @param {array} array The array to count values of
     * @returns {object}
     */
    static arrayCountValues(array)
    {
        const occurrences = {};

        for (let i = 0; i < array.length; i++) {
            occurrences[array[i]] = occurrences[array[i]] || 0;
            occurrences[array[i]]++;
        }

        return occurrences;
    }

    /**
     * Splits an array into chunks
     * @param {array} array
     * @param {number} chunkSize 
     * @returns {array}
     */
    static arrayChunk(array, chunkSize)
    {
        const chunks = [];
        
        for (let count = 0; count < array.length; count += chunkSize) {
            chunks.push(array.slice(count, count + chunkSize));
        }

        return chunks;
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
