export class Array2dItem
{
    /**
     * @param {number} x
     * @param {number} y
     * @param {any} value
     * @param {object} customData
     * @param {Array2d} parent The Array2d this item is part of
     * @constructor
     */
    constructor(x, y, value, customData = {}, parent = undefined)
    {
        this.x = x;
        this.y = y;
        this.value = value;
        this.parent = parent;

        for (const key in customData) {
            // Allow dynamic properties using a callback
            this[key] = (customData[key] instanceof Function)
                ? customData[key](x, y)
                : customData[key];
        }
    }

    /**
     * @param {Array2d} parent 
     * @returns {Array2dItem}
     */
    setParent(parent)
    {
        this.parent = parent;

        return this;
    }

    /**
     * @returns {Array2d}
     */
    getParent()
    {
        return this.parent;
    }

    /**
     * @see Array2d.getSteps
     */
    getSteps(toX, toY, separately = false)
    {
        return Array2d.getSteps(this, toX, toY, undefined, separately);
    }

    /**
     * @see Array2d.getDistance
     */
    getDistance(toX, toY)
    {
        return Array2d.getDistance(this, toX, toY);
    }

    /**
     * @see Array2d.getAdjacentItems
     */
    getAdjacentItems(named = false)
    {
        if (this.parent === undefined) {
            throw new Error('The item needs a parent to get its adjacent items');
        }

        return this.parent.getAdjacentItems(this, undefined, named);
    }

    /**
     * @see Array2d.getSurroundingItems
     */
    getSurroundingItems(named = false)
    {
        if (this.parent === undefined) {
            throw new Error('The item needs a parent to get its surrounding items');
        }

        return this.parent.getSurroundingItems(this, undefined, named);
    }

    /**
     * Prepare this object for JSON.stringify()
     * @returns {object}
     */
    toJSON()
    {
        // The properties to skip in JSON
        const skip = ['parent'];
        const forJson = {};

        // Set the properties to include in JSON
        for (const property in this) {
            if (! skip.includes(property)) {
                forJson[property] = this[property];
            }
        }

        return forJson;
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
     * Calculate the amount of steps between 2 points
     * @param {number|Array2dItem} fromX
     * @param {number|Array2dItem} fromY
     * @param {number|Array2dItem} toX
     * @param {number} toY
     * @param {boolean} separately Whether to return X and Y steps separately
     * @returns {number}
     */
    static getSteps(fromX, fromY, toX, toY, separately = false)
    {
        if (toX instanceof Array2dItem) {
            toX = toX.x;
            toY = toX.y;
        } else if (fromY instanceof Array2dItem) {
            toX = fromY.x;
            toY = fromY.y;
            fromY = fromX.y;
            fromX = fromX.x;
        } else if (fromX instanceof Array2dItem) {
            toY = toX;
            toX = fromY;
            fromY = fromX.y;
            fromX = fromX.x;
        }

        const steps = {
            x: Math.abs(toX - fromX),
            y: Math.abs(toY - fromY),
        };

        return (separately === true)
            ? steps
            : steps.x + steps.y;
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
        const {x, y} = this.getSteps(fromX, fromY, toX, toY, true);

        return Math.sqrt(x ** 2 + y ** 2);
    }

    /**
     * Initialize with custom data for every item
     * @param {object} customData
     * @param  {...any} values See constructor
     * @returns {Array2d}
     */
    static withData(customData, ...values)
    {
        Array2d.customData = customData;

        return new Array2d(...values);
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
                        .map((item, x) => new Array2dItem(x, y, undefined, Array2d.customData))
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
                : new Array2dItem(x, y, value, Array2d.customData)
        ));

        // Empty the static extra data
        Array2d.customData = undefined;

        super(...newArray);

        // Set the parent array in all items
        this.forEach2d(item => item.setParent(this));
    }

    /**
     * Make a new Array2d, where a new one is attached to the current
     * @param {Array2d} attachArray
     * @return {Array2d}
     */
    attachRight(attachArray)
    {
        // Update the indexes, before attaching
        attachArray.forEach2d(item => item.parent = this);
        attachArray.forEach2d(item => item.x += this[0].length);
        this.forEach((row, index) => this[index] = row.concat(attachArray[index]));

        return this;
    }

    /**
     * Make a new Array2d, where a new one is attached to the current
     * @param {Array2d} attachArray
     * @return {Array2d}
     */
    attachLeft(attachArray)
    {
        // Update the parents and indexes, before attaching
        attachArray.forEach2d(item => item.parent = this);
        this.forEach2d(item => item.x += attachArray[0].length);
        this.forEach((row, index) => this[index] = attachArray[index].concat(this[index]));

        return this;
    }

    /**
     * Make a new Array2d, where a new one is attached to the current
     * @param {Array2d} attachArray
     * @return {Array2d}
     */
    attachUp(attachArray)
    {
        // Update the parents and indexes, before attaching
        attachArray.forEach2d(item => item.parent = this);
        this.forEach2d(item => item.y += attachArray.length);
        attachArray.reverse().forEach(attachRow => this.unshift(attachRow));

        return this;
    }

    /**
     * Make a new Array2d, where a new one is attached to the current
     * @param {Array2d} attachArray
     * @return {Array2d}
     */
    attachDown(attachArray)
    {
        // Update the parents and indexes, before attaching
        attachArray.forEach2d(item => item.parent = this);
        attachArray.forEach2d(item => item.y += this.length);
        attachArray.forEach(attachRow => this.push(attachRow));

        return this;
    }

    /**
     * Wrapper for attach methods
     * @param {string} direction
     * @param {Array2d} attachArray
     * @return {Array2d}
     */
    attach(direction, attachArray)
    {
        if (direction === 'right') {
            return this.attachRight(attachArray);
        } else if (direction === 'left') {
            return this.attachLeft(attachArray);
        } else if (direction === 'up') {
            return this.attachUp(attachArray);
        } else if (direction === 'down') {
            return this.attachDown(attachArray);
        }
    }

    /**
     * Create a clone of the current object
     * @returns {Array2d}
     */
    clone()
    {
        const clone = JSON.parse(JSON.stringify(this))
            .map(row => row.map(item => {
                // Recreate the custom data object
                const customData = {};
                for (const key in item) {
                    // Skip default properties
                    if (['x', 'y', 'value', 'parent'].includes(key)) {
                        continue;
                    }

                    customData[key] = item[key];
                }

                return new Array2dItem(item.x, item.y, item.value, customData);
            }));

        // Set the new parent in the new items
        const newArray2d = new Array2d(clone);
        newArray2d.forEach2d(item => item.parent = newArray2d);

        return newArray2d;
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
     * @param {boolean} named Whether to return named pairs
     * @returns {array|object}
     */
    getAdjacentItems(x, y, named = false)
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

        return (named)
            ? items
            : Object.values(items);
    }

    /**
     * Get horizontally, vertically and diagonally connected items
     * @param {number|Array2dItem} x
     * @param {number} y
     * @param {boolean} named Whether to return named pairs
     * @returns {array|object}
     */
    getSurroundingItems(x, y, named = false)
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
     * @param {object} customData
     * @returns {Array2d}
     */
    setItem(x, y, value, customData = {})
    {
        if (this[y] === undefined) {
            this[y] = [];
        }

        this[y][x] = new Array2dItem(x, y, value, customData, this);

        return this;
    }

    /**
     * Update an existing item
     * @param {number} x
     * @param {number} y
     * @param {any} value
     * @param {object} customData
     * @returns {Array2d}
     */
    updateItem(x, y, value, customData = {})
    {
        const existingItem = this.getItem(x, y);

        // Create a new item, if it doesn't exist
        if (existingItem === undefined) {
            return this.setItem(x, y, value, customData);
        }

        // Update the item
        existingItem.value = value;
        for (const key in customData) {
            existingItem[key] = customData[key];
        }

        return this;
    }

    /**
     * Expand the 2D array horizontally
     * @param {number} amount < 0 means to the left, > 0 means to the right
     * @param {any} value A value to set in the new items
     * @param {object} customData
     * @returns {Array2d}
     */
    expandHorizontally(amount, value = undefined, customData = {})
    {
        this.forEach((row, y) => {
            if (amount < 0) {
                // Prepend every row with 1 or more items
                for (let i = 0; i < Math.abs(amount); i++) {
                    row.forEach(item => item.x++);
                    row.unshift(new Array2dItem(0, y, value, customData, this));
                }
            } else {
                // Append every row with 1 or more items
                for (let i = 0; i < amount; i++) {
                    row.push(new Array2dItem(row.length, y, value, customData, this));
                }
            }
        });

        return this;
    }

    /**
     * Expand the 2D array vertically
     * @param {number} amount < 0 means to the top, > 0 means to the bottom
     * @param {any} value A value to set in the new items
     * @param {object} customData
     * @returns {Array2d}
     */
    expandVertically(amount, value = undefined, customData)
    {
        if (amount < 0) {
            // Prepend the new row
            for (let i = 0; i < Math.abs(amount); i++) {
                this.forEach2d(item => item.y++);
                this.unshift(
                    Array(this[0].length).fill(undefined)
                        .map((item, x) => new Array2dItem(x, 0, value, customData, this))
                );
            }
        } else {
            // Append the new row
            for (let i = 0; i < amount; i++) {
                this.push(
                    Array(this[0].length).fill(undefined)
                        .map((item, x) => new Array2dItem(x, this.length, value, customData, this))
                );
            }
        }

        return this;
    }

    /**
     * Expand the 2D array on all 4 sides
     * @param {number} amount The amount to add in each direction
     * @param {any} value A value to set in the new items
     * @param {object} customData Extra data for the items
     * @returns {Array2d}
     */
    expandAllSides(amount, value = undefined, customData)
    {
        return this.expandHorizontally(amount * -1, value, customData)
            .expandHorizontally(amount, value, customData)
            .expandVertically(amount * -1, value, customData)
            .expandVertically(amount, value, customData);
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
     * @returns {void}
     */
    forEach2d(callback)
    {
        this.forEach((row, y) =>
            row.forEach((item, x) => callback(item, x, y, this)));
    }

    /**
     * Keep items based on a callback for every item
     * @param {function} callback
     * @param {boolean} flatten
     * @returns {Array2d}
     */
    filter2d(callback, flatten = false)
    {
        const result = this.map((row, y) => row.filter((item, x) => callback(item, x, y, this)));

        return (flatten)
            ? new Array(...result.flat())
            : result;
    }

    /**
     * Remove items based on a callback for every item
     * @param {function} callback
     * @param {boolean} flatten
     * @returns {Array2d}
     */
    reject2d(callback, flatten = false)
    {
        const result = this.map((row, y) => row.filter((item, x) => ! callback(item, x, y, this)));

        return (flatten)
            ? new Array(...result.flat())
            : result;
    }

    /**
     * Reduce all items to a single value, using a callback for every item
     * @param {function} callback
     * @param {any} initialValue
     * @returns {any}
     */
    reduce2d(callback, initialValue = undefined)
    {
        return this.flat()
            .reduce((accumulator, item) => callback(accumulator, item, item.x, item.y, this), initialValue);
    }

    /**
     * Convert the array to string
     * @param {function} callback A callback to apply to every item
     * @returns {array}
     */
    toString(callback = undefined)
    {
        // The default callback returns the value of every item
        if (callback === undefined) {
            callback = item => item.value;
        }

        return this.map((row, y) =>
            row.reduce((string, item, x) => string += callback(item, x, y, this), '')
        ).join('\n');
    }
}
