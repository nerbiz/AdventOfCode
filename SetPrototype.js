export default class SetPrototype
{
    static registerAll()
    {
        this.registerIsSubsetOf();
        this.registerUnion();
        this.registerJoin();
        this.registerIntersection();
        this.registerDifference();
        this.registerMutualDifference();
    }

    static registerIsSubsetOf()
    {
        Object.defineProperty(Set.prototype, 'isSubsetOf', {
            /**
             * See if the current set is a subset of another
             * @param {Set} otherSet
             * @returns {boolean}
             */
            value: function isSubsetOf(otherSet) {
                for (const item of this) {
                    if (! otherSet.has(item)) {
                        return false;
                    }
                }

                return true;
            },
            enumerable: false,
            writable: false,
        });
    }

    static registerUnion()
    {
        Object.defineProperty(Set.prototype, 'union', {
            /**
             * Get the union of the current set and another
             * @param {Set} otherSet
             * @returns {Set}
             */
            value: function union(otherSet) {
                const union = new Set(this);

                for (const item of otherSet) {
                    union.add(item);
                }

                return union;
            },
            enumerable: false,
            writable: false,
        });
    }

    static registerJoin()
    {
        Object.defineProperty(Set.prototype, 'join', {
            /**
             * Join another set into the current
             * @param {Set} otherSet
             * @returns {Set}
             */
            value: function join(otherSet) {
                for (const item of otherSet) {
                    this.add(item);
                }
            },
            enumerable: false,
            writable: false,
        });
    }

    static registerIntersection()
    {
        Object.defineProperty(Set.prototype, 'intersection', {
            /**
             * Get the intersection of the current set and another
             * @param {Set} otherSet
             * @returns {Set}
             */
            value: function intersection(otherSet) {
                const intersection = new Set();

                for (const item of this) {
                    if (otherSet.has(item)) {
                        intersection.add(item);
                    }
                }

                return intersection;
            },
            enumerable: false,
            writable: false,
        });
    }

    static registerDifference()
    {
        Object.defineProperty(Set.prototype, 'difference', {
            /**
             * Get items of the current set, that aren't in another set
             * @param {Set} otherSet
             * @returns {Set}
             */
            value: function difference(otherSet) {
                const difference = new Set(this);

                for (const item of otherSet) {
                    difference.delete(item);
                }

                return difference;
            },
            enumerable: false,
            writable: false,
        });
    }

    static registerMutualDifference()
    {
        Object.defineProperty(Set.prototype, 'mutualDifference', {
            /**
             * Get the mutual difference between the current set and another
             * @param {Set} otherSet
             * @returns {Set}
             */
            value: function mutualDifference(otherSet) {
                const difference = new Set(this);

                for (const item of otherSet) {
                    if (difference.has(item)) {
                        difference.delete(item);
                    } else {
                        difference.add(item);
                    }
                }

                return difference;
            },
            enumerable: false,
            writable: false,
        });
    }
}
