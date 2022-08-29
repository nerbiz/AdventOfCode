export default class ArrayPrototype
{
    /**
     * Call all register...() functions
     */
    static registerAll()
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
        this.registerTake();
        this.registerSortGrouped();
        this.registerSameContents();
        this.registerRepeatValues();
    }

    static registerClone()
    {
        Object.defineProperty(Array.prototype, 'clone', {
            /**
             * Create a clone of an array
             * @param {boolean} completely Whether to make a shallow copy (false) or not (true)
             * @returns {array}
             */
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

    static registerIndexesOf()
    {
        Object.defineProperty(Array.prototype, 'indexesOf', {
            /**
             * Like indexOf(), but finds all the indexes
             * @param {any} searchElement The item to search for
             * @param {number} fromIndex The index to start the search at
             * @returns {array}
             */
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

    static registerUnique()
    {
        Object.defineProperty(Array.prototype, 'unique', {
            /**
             * Remove duplicates from an array
             * @returns {array}
             */
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

    static registerSum()
    {
        Object.defineProperty(Array.prototype, 'sum', {
            /**
             * Calculate the sum of array items
             * @returns {number}
             */
            value: function sum() {
                return this.reduce((sum, item) => (sum + item), 0);
            },
            enumerable: false,
            writable: false,
        });
    }

    static registerProduct()
    {
        Object.defineProperty(Array.prototype, 'product', {
            /**
             * Calculate the product of array items
             * @returns {number}
             */
            value: function product() {
                return this.reduce((sum, item) => (sum * item), 1);
            },
            enumerable: false,
            writable: false,
        });
    }

    static registerIntersection()
    {
        Object.defineProperty(Array.prototype, 'intersection', {
            /**
             * Get array items that exist in the other arrays
             * @param {array} arrays 1 or more arrays to compare with
             * @returns {array}
             */
            value: function intersection(...arrays) {
                arrays = [].concat(...arrays);
                return this.filter(item => arrays.includes(item));
            },
            enumerable: false,
            writable: false,
        });
    }

    static registerDifference()
    {
        Object.defineProperty(Array.prototype, 'difference', {
            /**
             * Get items from array 1, that don't exist in the other arrays
             * @param {array} arrays 1 or more arrays to compare with
             * @returns {array}
             */
            value: function difference(...arrays) {
                arrays = [].concat(...arrays);
                return this.filter(item => ! arrays.includes(item));
            },
            enumerable: false,
            writable: false,
        });
    }

    static registerCountValues()
    {
        Object.defineProperty(Array.prototype, 'countValues', {
            /**
             * Counts the occurrences of values in an array
             * @param {boolean} asObject Whether to return an array or object
             * @returns {array|object}
             */
            value: function countValues(asObject = false) {
                let occurrences = {};

                for (let i = 0; i < this.length; i++) {
                    // Make value:[value, amount] entries
                    occurrences[this[i]] = occurrences[this[i]] || [this[i], 0];
                    occurrences[this[i]][1]++;
                }

                // Keep the values, which are [value, amount] arrays
                occurrences = Object.values(occurrences);

                return (asObject === true)
                    ? Object.fromEntries(occurrences)
                    : occurrences;
            },
            enumerable: false,
            writable: false,
        });
    }

    static registerChunk()
    {
        Object.defineProperty(Array.prototype, 'chunk', {
            /**
             * Splits an array into chunks
             * @param {number} chunkSize
             * @returns {array}
             */
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

    static registerTap()
    {
        Object.defineProperty(Array.prototype, 'tap', {
            /**
             * Apply a callback to every item and return the array itself unaltered
             * @param {function} callback
             * @returns {array}
             */
            value: function tap(callback) {
                this.forEach(callback);
                return this;
            },
            enumerable: false,
            writable: false,
        });
    }

    static registerTake()
    {
        Object.defineProperty(Array.prototype, 'take', {
            /**
             * Like filter, but also removes the found items from the array
             * @param {function} callback
             * @returns {array}
             */
            value: function take(callback) {
                const taken = [];
                const takenIndexes = [];

                // Get items to take from the array
                for (let index = 0; index < this.length; index++) {
                    if (callback(this[index], index, this)) {
                        taken.push(this[index]);
                        takenIndexes.unshift(index);
                    }
                }

                // Remove the taken items
                for (const index of takenIndexes) {
                    this.splice(index, 1);
                }

                return taken;
            },
            enumerable: false,
            writable: false,
        });
    }

    static registerSortGrouped()
    {
        Object.defineProperty(Array.prototype, 'sortGrouped', {
            /**
             * Group by with sorting, then sort the grouped items
             * @param {any} groupBy
             * @param {function} callback1
             * @param {function} callback2
             * @return {array}
             */
            value: function sortGrouped(groupBy, callback1, callback2) {
                const grouped = [];

                this.map(item => item)
                    .sort(callback1)
                    .forEach((item, index, items) => {
                        if (item[groupBy] === items[index - 1]?.[groupBy]) {
                            grouped.at(-1).push(item);
                        } else {
                            grouped.push([item]);
                        }
                    });

                return grouped.map(group => group.sort(callback2)).flat();
            },
            enumerable: false,
            writable: false,
        });
    }

    static registerSameContents()
    {
        Object.defineProperty(Array.prototype, 'sameContents', {
            /**
             * Check if 1 or more arrays have the same contents as the current
             * @param {array} arrays 1 or more arrays to compare
             * @returns {boolean}
             */
            value: function sameContents(...arrays) {
                // Check for equal length first
                for (const other of arrays) {
                    if (other.length !== this.length) {
                        return false;
                    }
                }

                for (let i = 0; i < this.length; i++) {
                    for (const other of arrays) {
                        if (other[i] !== this[i]) {
                            return false;
                        }
                    }
                }

                return true;
            },
            enumerable: false,
            writable: false,
        });
    }

    static registerRepeatValues()
    {
        Object.defineProperty(Array.prototype, 'repeatValues', {
            /**
             * Repeat the values of an array, up to a certain length
             * @param {number} targetLength
             * @returns {array}
             */
            value: function repeatValues(targetLength) {
                let newArray = this;
                while (newArray.length < targetLength) {
                    newArray = newArray.concat(this);
                }

                return newArray.slice(0, targetLength);
            },
            enumerable: false,
            writable: false,
        });
    }
}
