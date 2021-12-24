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
     * Create a 2D array from a 1D array
     * @param {array} array
     * @param {number} rowLength The maximum length of each row
     * @returns {Array2d}
     */
    static from1d(array, rowLength)
    {
        const rows = [];

        // Split the input array into rows
        for (let i = 0; i < array.length; i += rowLength) {
            rows.push(array.slice(i, i + rowLength));
        }

        return new Array2d(rows);
    }

    /**
     * Calculate the distance between 2 points
     * @param {number|Array2dItem} fromX
     * @param {number|Array2dItem} fromY
     * @param {number|Array2dItem} toX
     * @param {number} toY
     * @returns {number}
     */
    static getDistance(fromX, fromY, toX, toY)
    {
        if (toX instanceof Array2dItem) {
            toX = toX.x;
            toY = toX.y;
        } else if (fromY instanceof Array2dItem) {
            toX = fromY.x;
            toY = fromY.y;
            fromY = fromX.y;
            fromX = fromX.x;
        }

        return Math.sqrt(
            Math.abs(toX - fromX) ** 2
            + Math.abs(toY - fromY) ** 2
        );
    }

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
            // Create empty rows based on the given rows amount
            newArray = new Array(values[0])
                .fill(undefined)
                .map(row => []);

            // Fill the rows with items, based on the given items amount
            if (Number.isInteger(values[1])) {
                newArray = newArray.map((row, y) =>
                    new Array(values[1])
                        .fill(undefined)
                        .map((item, x) => new Array2dItem(x, y))
                );
            }
        } else if (
            values.length === 1
            && Array.isArray(values[0])
            && Array.isArray(values[0][0])
        ) {
            // An existing 2D array is given
            newArray = values[0];
        } else {
            // An N amount of arrays have been given
            newArray = values;
        }

        // Convert values to objects if needed
        newArray = newArray.map((row, y) => row.map((value, x) =>
            (value instanceof Array2dItem)
                ? value
                : new Array2dItem(x, y, value)
        ));

        super(...newArray);
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
    getItem(x, y, fallback = undefined)
    {
        if (this[y] === undefined) {
            return fallback;
        }

        return (this[y][x] !== undefined)
            ? this[y][x]
            : fallback;
    }

    /**
     * Get horizontally and vertically connected items
     * @param {number|Array2dItem} x
     * @param {number} y
     * @param {boolean} removeUndefined Whether to keep/delete undefined items
     * @param {boolean} named Whether to return named pairs
     * @returns {array|object}
     */
    getAdjacentItems(x, y, removeUndefined = false, named = false)
    {
        if (x instanceof Array2dItem) {
            y = x.y;
            x = x.x;
        }

        const items = {
            up: this.getItem(x, y - 1),
            down: this.getItem(x, y + 1),
            left: this.getItem(x - 1, y),
            right: this.getItem(x + 1, y),
        };

        // Filter out undefined items
        if (removeUndefined === true) {
            for (const key in items) {
                if (items[key] === undefined) {
                    delete items[key];
                }
            }
        }

        return (named)
            ? items
            : Object.values(items);
    }

    /**
     * Get horizontally, vertically and diagonally connected items
     * @param {number|Array2dItem} x
     * @param {number} y
     * @param {boolean} removeUndefined Whether to keep/delete undefined items
     * @param {boolean} named Whether to return named pairs
     * @returns {array|object}
     */
    getSurroundingItems(x, y, removeUndefined = false, named = false)
    {
        if (x instanceof Array2dItem) {
            y = x.y;
            x = x.x;
        }

        const items = {
            upLeft: this.getItem(x - 1, y - 1),
            up: this.getItem(x, y - 1),
            upRight: this.getItem(x + 1, y - 1),
            left: this.getItem(x - 1, y),
            right: this.getItem(x + 1, y),
            downLeft: this.getItem(x - 1, y + 1),
            down: this.getItem(x, y + 1),
            downRight: this.getItem(x + 1, y + 1),
        };

        if (removeUndefined === true) {
            // Filter out undefined items
            for (const key in items) {
                if (items[key] === undefined) {
                    delete items[key];
                }
            }
        }

        return (named)
            ? items
            : Object.values(items);
    }

    /**
     * Get a part of the 2D array
     * @param {number} startX
     * @param {number} startY
     * @param {number} endX The X index before which to stop slicing
     * @param {number} endY The Y index before which to stop slicing
     */
    getSlice(startX, startY, endX, endY)
    {
        return this.slice(startY, endY)
            .map(row => row.slice(startX, endX));
    }

    /**
     * Get all columns
     * @returns {array}
     */
    getColumns()
    {
        const columns = [];

        if (this.length === 0) {
            return columns;
        }

        // Loop over the length of the first row
        this.at(0).forEach((item, x) => {
            columns.push(this.reduce((column, row) => column.concat(row[x]), []));
        });

        return columns;
    }

    /**
     * Get a single column
     * @param {number} x The column index
     * @returns {array}
     */
    getColumn(x)
    {
        return this.getColumns().at(x);
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
            ? new Array(...allValues.flat())
            : allValues;
    }

    /**
     * Returns the amount of items
     * @returns {number}
     */
    countItems()
    {
        return this.getAllValues(true).length;
    }

    /**
     * Insert a new item
     * @param {number} x
     * @param {number} y
     * @param {any} value
     * @param {object} extraData
     * @returns {Array2d}
     */
    setItem(x, y, value, extraData)
    {
        if (this[y] === undefined) {
            this[y] = [];
        }

        this[y][x] = new Array2dItem(x, y, value, extraData);

        return this;
    }

    /**
     * Update an existing item
     * @param {number} x
     * @param {number} y
     * @param {any} value
     * @param {object} extraData
     * @returns {Array2d}
     */
    updateItem(x, y, value, extraData)
    {
        const existingItem = this.getItem(x, y);

        // Create a new item, if it doesn't exist
        if (existingItem === undefined) {
            return this.setItem(x, y, value, extraData);
        }

        // Update the item
        existingItem.value = value;
        for (const key in extraData) {
            existingItem[key] = extraData[key];
        }

        return this;
    }

    /**
     * Expand the 2D array horizontally
     * @param {number} amount < 0 means to the left, > 0 means to the right
     * @param {any} value A value to set in the new items
     * @returns {Array2d}
     */
    expandHorizontally(amount, value)
    {
        this.forEach((row, y) => {
            if (amount < 0) {
                // Prepend every row with 1 or more items
                for (let i = 0; i < Math.abs(amount); i++) {
                    row.forEach(item => item.x++);
                    row.unshift(new Array2dItem(0, y, value));
                }
            } else {
                // Append every row with 1 or more items
                for (let i = 0; i < amount; i++) {
                    row.push(new Array2dItem(row.length, y, value));
                }
            }
        });

        return this;
    }

    /**
     * Expand the 2D array vertically
     * @param {number} amount < 0 means to the top, > 0 means to the bottom
     * @param {any} value A value to set in the new items
     * @returns {Array2d}
     */
    expandVertically(amount, value)
    {
        if (amount < 0) {
            // Prepend the new row
            for (let i = 0; i < Math.abs(amount); i++) {
                this.forEach2d(item => item.y++);
                this.unshift(
                    Array(this[0].length).fill(undefined)
                        .map((item, x) => new Array2dItem(x, 0, value))
                );
            }
        } else {
            // Append the new row
            for (let i = 0; i < amount; i++) {
                this.push(
                    Array(this[0].length).fill(undefined)
                        .map((item, x) => new Array2dItem(x, this.length, value))
                );
            }
        }

        return this;
    }

    /**
     * Checks whether all given values exist in the array
     * @param {array} values
     * @returns {boolean}
     */
    containsAll(values)
    {
        return values.every(value => this.getAllValues(true).includes(value));
    }

    /**
     * Checks whether any of the given values exist in the array
     * @param {array} values
     * @returns {boolean}
     */
    containsAny(values)
    {
        return values.some(value => this.getAllValues(true).includes(value));
    }

    /**
     * Create a new array using a callback to apply to every item
     * @param {function} callback
     * @returns {Array2d}
     */
    map2d(callback)
    {
        return this.map((row, y) =>
            row.map((item, x) => callback(item, x, y, this)));
    }

    /**
     * Apply a callback to every item
     * @param {function} callback
     * @returns {Array2d}
     */
    forEach2d(callback)
    {
        this.forEach((row, y) =>
            row.forEach((item, x) => callback(item, x, y, this)));
    }

    /**
     * Keep items based on a callback for every item
     * @param {function} callback
     * @returns {Array2d}
     */
    filter2d(callback, flatten = false)
    {
        return this
            .map((row, y) => row.filter((item, x) => callback(item, x, y, this)))
            .getAllValues(flatten);
    }

    /**
     * Remove items based on a callback for every item
     * @param {function} callback
     * @returns {Array2d}
     */
    reject2d(callback, flatten = false)
    {
        return this
            .map((row, y) => row.filter((item, x) => ! callback(item, x, y, this)))
            .getAllValues(flatten);
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
