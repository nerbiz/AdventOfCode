export default class ArrayPrototype
{
    /**
     * Call all register...() functions
     */
    static extend()
    {
        this.registerIndexesOf();
        this.registerUnique();
        this.registerSum();
        this.registerProduct();
        this.registerIntersection();
        this.registerDifference();
        this.registerCountValues();
        this.registerChunk();
        this.registerClone();
        this.registerTap();
    }

    /**
     * Create a clone of an array
     * @param {boolean} completely Whether to make a shallow copy (false) or not (true)
     * @returns {array}
     */
    static registerClone()
    {
        Object.defineProperty(Array.prototype, 'clone', {
            value: function clone(completely = false) {
                return (completely === true)
                    // Clone everything, including array items
                    ? JSON.parse(JSON.stringify(this))
                    // Shallow copy: create a new array,
                    // with the same item references (in case of objects)
                    : this.map(item => (Array.isArray(item))
                        ? item.clone(completely)
                        : item);
            },
            enumerable: false,
            writable: false,
        });
    }

    /**
     * Like indexOf(), but finds all the indexes
     * @param {any} searchElement The item to search for
     * @param {number} fromIndex The index to start the search at
     * @returns {array}
     */
    static registerIndexesOf()
    {
        Object.defineProperty(Array.prototype, 'indexesOf', {
            value: function indexesOf(searchElement, fromIndex = 0) {
                const indexes = [];
                let index;

                while ((index = this.indexOf(searchElement, fromIndex)) !== -1) {
                    indexes.push(index);
                    fromIndex = index + 1;
                }

                return indexes;
            },
            enumerable: false,
            writable: false,
        });
    }

    /**
     * Remove duplicates from an array
     * @returns {array}
     */
    static registerUnique()
    {
        Object.defineProperty(Array.prototype, 'unique', {
            value: function unique() {
                const unique = [];

                for (let i = 0; i < this.length; i++) {
                    if (unique.indexOf(this[i]) === -1) {
                        unique.push(this[i]);
                    }
                }

                return unique;
            },
            enumerable: false,
            writable: false,
        });
    }

    /**
     * Calculate the sum of array items
     * @returns {number}
     */
    static registerSum()
    {
        Object.defineProperty(Array.prototype, 'sum', {
            value: function sum() {
                return this.reduce((sum, item) => (sum + item), 0);
            },
            enumerable: false,
            writable: false,
        });
    }

    /**
     * Calculate the product of array items
     * @returns {number}
     */
    static registerProduct()
    {
        Object.defineProperty(Array.prototype, 'product', {
            value: function product() {
                return this.reduce((sum, item) => (sum * item), 1);
            },
            enumerable: false,
            writable: false,
        });
    }

    /**
     * Get array items that exist in the other arrays
     * @param {array} arrays 1 or more arrays to compare with
     * @returns {array}
     */
    static registerIntersection()
    {
        Object.defineProperty(Array.prototype, 'intersection', {
            value: function intersection(...arrays) {
                arrays = [].concat(...arrays);
                return this.filter(item => arrays.includes(item));
            },
            enumerable: false,
            writable: false,
        });
    }

    /**
     * Get items from array 1, that don't exist in the other arrays
     * @param {array} arrays 1 or more arrays to compare with
     * @returns {array}
     */
    static registerDifference()
    {
        Object.defineProperty(Array.prototype, 'difference', {
            value: function difference(...arrays) {
                arrays = [].concat(...arrays);
                return this.filter(item => ! arrays.includes(item));
            },
            enumerable: false,
            writable: false,
        });
    }

    /**
     * Counts the occurrences of values in an array
     * @param {boolean} asArray Whether to return an array or object
     * @returns {object}
     */
    static registerCountValues()
    {
        Object.defineProperty(Array.prototype, 'countValues', {
            value: function countValues(asArray = false) {
                let occurrences = {};

                for (let i = 0; i < this.length; i++) {
                    // Make value:[value, amount] entries
                    occurrences[this[i]] = occurrences[this[i]] || [this[i], 0];
                    occurrences[this[i]][1]++;
                }

                // Keep the values, which are [value, amount] arrays
                occurrences = Object.values(occurrences);

                return (asArray === true)
                    ? occurrences
                    : Object.fromEntries(occurrences);
            },
            enumerable: false,
            writable: false,
        });
    }

    /**
     * Splits an array into chunks
     * @param {number} chunkSize
     * @returns {array}
     */
    static registerChunk()
    {
        Object.defineProperty(Array.prototype, 'chunk', {
            value: function chunk(chunkSize) {
                const chunks = [];

                for (let count = 0; count < this.length; count += chunkSize) {
                    chunks.push(this.slice(count, count + chunkSize));
                }

                return chunks;
            },
            enumerable: false,
            writable: false,
        });
    }

    /**
     * Apply a callback to every item and return the array itself unaltered
     * @param {function} callback
     * @returns {array}
     */
    static registerTap()
    {
        Object.defineProperty(Array.prototype, 'tap', {
            value: function tap(callback) {
                this.forEach(callback);
                return this;
            },
            enumerable: false,
            writable: false,
        });
    }
}
