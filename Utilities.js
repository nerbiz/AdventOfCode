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
     * @param {any} search The item to search for
     * @param {number} start The index to start the search at
     * @returns {array}
     */
    static indexesOf(array, search, start)
    {
        start = (start === undefined) ? 0 : start;
        const indexes = [];
        let index;
        
        while ((index = array.indexOf(search, start)) !== -1) {
            indexes.push(index);
            start = index + 1;
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
}
