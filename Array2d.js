export class Array2dItem
{
    /**
     * @param {number} x
     * @param {number} y
     * @param {any} value
     * @param {object} extraData
     * @constructor
     */
    constructor(x, y, value = undefined, extraData = {})
    {
        this.x = x;
        this.y = y;
        this.value = value;

        for (const key in extraData) {
            // Allow dynamic properties using a callback
            this[key] = (extraData[key] instanceof Function)
                ? extraData[key](x, y)
                : extraData[key];
        }
    }
}



export default class Array2d extends Array
{
    /**
     * @param {...any} values
     * index 0 can be:
     *   - Amount of (empty) rows
     *   - An existing 2D array, i.e. [[], [], []]
     *   - Item 1 of a series of arrays passed as arguments, i.e. []
     * index 1 can be:
     *   - Amount of columns
     *   - Item 2 of a series of arrays passed as arguments, i.e. []
     * index N can be:
     *   - Item N of a series of arrays passed as arguments, i.e. []
     * @constructor
     */
    constructor(...values)
    {
        let newArray;

        if (Number.isInteger(values[0])) {
            // Based on 1D array length
            newArray = new Array(values[0])
                .fill(undefined)
                .map(row => []);

            // Based on 2D array length
            if (Number.isInteger(values[1])) {
                newArray = newArray.map((row, y) => {
                    return new Array(values[1])
                        .fill(undefined)
                        .map((item, x) => {
                            return new Array2dItem(x, y);
                        });
                });
            }
        }

        // Based on 2D array
        else if (values.length === 1 && Array.isArray(values[0]) && Array.isArray(values[0][0])) {
            newArray = values[0].map((row, y) => row.map((item, x) =>
                (item instanceof Array2dItem)
                    ? item
                    : new Array2dItem(x, y, item)
            ));
        }

        // Based on N amount of arrays passed as arguments
        else {
            newArray = values.map((row, y) => row.map((item, x) =>
                (item instanceof Array2dItem)
                    ? item
                    : new Array2dItem(x, y, item)
            ));
        }

        super(...newArray);

        // Define the columns
        Object.defineProperty(this, 'columns', {
            value: [],
            enumerable: false,
            writable: false,
        });

        this.at(0).forEach((item, x) => {
            this.columns.push(
                this.reduce((column, row) => column.concat(row[x]), [])
            );
        });
    }

    /**
     * @param {array} array A 1-dimensional array
     */
    static from1d(array, rowLength)
    {
        // For instance, an array of 20 items, divide into 4 rows of 5 items
    }

    /**
     * Create a clone of the current object
     * @returns {Array2d}
     */
    clone()
    {
        const clone = JSON.parse(JSON.stringify(this))
            .map((row, y) => row.map((item, x) => {
                // Recreate the extraData object
                const extraData = {};
                for (const key in item) {
                    // Skip default properties
                    if (['x', 'y', 'value'].includes(key)) {
                        continue;
                    }

                    extraData[key] = item[key];
                }

                return new Array2dItem(item.x, item.y, item.value, extraData);
            }));

        return new Array2d(clone);
    }

    /**
     * Checks whether there are any items
     * @returns {boolean}
     */
    isEmpty()
    {
        return this.every(row => row.length === 0);
    }

    /**
     * Get a value from the array
     * @param {number} x
     * @param {number} y
     * @param {any} fallback A default value, if the item doesn't exist
     * @returns {any}
     */
    get(x, y, fallback = undefined)
    {
        if (this[y] === undefined) {
            return fallback;
        }

        return (this[y][x] !== undefined)
            ? this[y][x].value
            : fallback;
    }

    /**
     * Get (a part of) a row
     * @param {number} y The row index
     * @param {number} startIndex Slice start index
     * @param {number} endIndex Index before which to end the slice
     * @returns {array}
     */
    getRow(y, startIndex = 0, endIndex = undefined)
    {
        if (this[y] === undefined) {
            throw new Error('Row at index ' + y + ' does not exist');
        }

        return this.at(y).slice(startIndex, endIndex);
    }

    /**
     * Get (part of) all rows
     * @param {number} startIndex Slice start index
     * @param {number} endIndex Index before which to end the slice
     * @returns {array}
     */
    getRows(startIndex = 0, endIndex = this.length)
    {
        return this.slice(startIndex, endIndex);
    }

    /**
     * Get (a part of) a column
     * @param {number} x The column index
     * @param {number} startIndex Slice start index
     * @param {number} endIndex Index before which to end the slice
     * @returns {array}
     */
    getColumn(x, startIndex = 0, endIndex = undefined)
    {
        if (this.columns[x] === undefined) {
            throw new Error('Column at index ' + x + ' does not exist');
        }

        return this.columns.at(x).slice(startIndex, endIndex);
    }

    /**
     * Get (part of) all columns
     * @param {number} startIndex Slice start index
     * @param {number} endIndex Index before which to end the slice
     * @returns {array}
     */
    getColumns(startIndex = 0, endIndex = this.columns.length)
    {
        return this.columns.slice(startIndex, endIndex);
    }

    /**
     * Get all the values
     * @param {boolean} flatten Whether to flatten the result
     * @returns {array}
     */
    getAllValues(flatten = false)
    {
        const allValues = this.map(row => row.map(item => item.value));

        return (flatten)
            ? allValues.flat()
            : allValues;
    }

    /**
     * Set a value in the array
     * @param {number} x
     * @param {number} y
     * @param {any} value
     * @returns {Array2d}
     */
    set(x, y, value)
    {
        if (this[y] === undefined) {
            this[y] = [];
        }

        this[y][x] = new Array2dItem(x, y, value);

        return this;
    }

    /**
     * Checks whether all given values exist in the array
     * @param {array} values
     * @returns {boolean}
     */
    contains(values)
    {
        const allValues = this.getAllValues(true);

        return values.every(value => allValues.includes(value));
    }

    /**
     * Create a new array using a callback to apply to every item
     * @param {function} callback
     * @returns {Array2d}
     */
    replaceAll(callback)
    {
        return this.map((row, y) =>
            row.map((item, x) => callback(item, x, y, this)));
    }

    /**
     * Apply a callback to every item
     * @param {function} callback
     * @returns {Array2d}
     */
    forAll(callback)
    {
        this.forEach((row, y) =>
            row.forEach((item, x) => callback(item, x, y, this)));
    }

    /**
     * Convert the array to string
     * @param {function} callback A callback to apply to every item
     * @returns {array}
     */
    toString(callback = null)
    {
        // The default callback returns the value of every item
        if (callback === null) {
            callback = item => item.value;
        }

        return this.map((row, y) =>
            row.reduce((string, item, x) => string += callback(item, x, y, this), '')
        ).join('\n');
    }
}
