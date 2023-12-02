export default class StringPrototype
{
    static registerIndexesOf()
    {
        Object.defineProperty(String.prototype, 'indexesOf', {
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
}
