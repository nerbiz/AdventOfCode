export class LinkedListNode
{
    /**
     * The value of the node
     * @type {any}
     */
    value = null;

    /**
     * The previous linked node
     * @type {LinkedListNode|null}
     */
    previous = null;

    /**
     * The next linked node
     * @type {LinkedListNode|null}
     */
    next = null;

    /**
     * @param {any} value
     * @constructor
     */
    constructor(value)
    {
        this.value = value;
    }
}

export default class LinkedList
{
    /**
     * The first node in the list
     * @type {LinkedListNode|null}
     */
    firstNode = null;

    /**
     * The amount of nodes in the list
     * @type {number}
     */
    size = 0;

    /**
     * @param {object} options
     * @constructor
     */
    constructor(options = {})
    {
        const {circular} = options;
        this.circular = (circular !== undefined) ? circular : false;
    }

    /**
     * Add a node at the end of the list
     * @param {any} value
     * @returns {void}
     */
    add(value)
    {
        const newNode = new LinkedListNode(value);

        // If the list is empty, the new node is the first node
        if (this.firstNode === null) {
            this.firstNode = newNode;

            if (this.circular === true) {
                this.firstNode.previous = this.firstNode;
                this.firstNode.next = this.firstNode;
            }

            return;
        }

        // Get the last node
        let lastNode = this.firstNode;
        while (lastNode.next !== null) {
            lastNode = lastNode.next;
        }

        lastNode.next = newNode;
        newNode.previous = lastNode;

        if (this.circular === true) {
            newNode.next = this.firstNode;
            this.firstNode.previous = newNode;
        }

        this.size++;
    }

    /**
     * Add a node before another
     * @param {LinkedListNode} node
     * @param {any} value
     * @returns {void}
     */
    addBefore(node, value)
    {
        const newNode = new LinkedListNode(value);

        // Set the new relations
        newNode.previous = node.previous;
        newNode.next = node;
        if (node.previous !== null) {
            node.previous.next = newNode;
        }
        node.previous = newNode;

        if (this.circular === true && node.previous === node) {
            node.previous = this.getLast();
        }

        this.size++;
    }

    /**
     * Add a node after another
     * @param {LinkedListNode} node
     * @param {any} value
     * @returns {void}
     */
    addAfter(node, value)
    {
        const newNode = new LinkedListNode(value);

        // Set the new relations
        newNode.previous = node;
        newNode.next = node.next;
        if (node.next !== null) {
            node.next.previous = newNode;
        }
        node.next = newNode;

        if (this.circular === true && node.previous === node) {
            node.previous = this.getLast();
        }

        this.size++;
    }

    /**
     * Remove a node
     * @param {LinkedListNode} node
     * @returns {void}
     */
    remove(node)
    {
        node.next.previous = node.previous;
        node.previous.next = node.next;
        node = null;

        this.size--;
    }

    /**
     * Get the first node from the list
     * @returns {LinkedListNode|null}
     */
    getFirst()
    {
        return this.firstNode;
    }

    /**
     * Get the last node from the list
     * @returns {LinkedListNode|null}
     */
    getLast()
    {
        if (this.firstNode === null) {
            return null;
        }

        let lastNode = this.firstNode;
        while (lastNode.next !== null) {
            // Prevent infinite loop in circular list
            if (this.circular === true && lastNode.next === this.firstNode) {
                break;
            }

            lastNode = lastNode.next;
        }

        return lastNode;
    }

    /**
     * Get a previous node, any amount of steps to the left
     * @param node
     * @param steps
     * @returns {LinkedListNode|null}
     */
    getPrevious(node, steps = 1)
    {
        let previousNode = node;
        for (let i = 0; i < steps; i++) {
            previousNode = previousNode.previous;

            if (previousNode === null) {
                return null;
            }
        }

        return previousNode;
    }

    /**
     * Get a next node, any amount of steps to the right
     * @param node
     * @param steps
     * @returns {LinkedListNode|null}
     */
    getNext(node, steps = 1)
    {
        let nextNode = node;
        for (let i = 0; i < steps; i++) {
            nextNode = nextNode.next;

            if (nextNode === null) {
                return null;
            }
        }

        return nextNode;
    }

    /**
     * Empty the list
     * @returns {void}
     */
    clear()
    {
        this.firstNode.next.previous = null;
        if (this.circular === true) {
            this.firstNode.previous.next = null;
        }
        this.firstNode = null;
        this.size = 0;
    }

    /**
     * Get all values as an array
     * @returns {array}
     */
    toArray()
    {
        const values = [];

        let currentNode = this.firstNode;
        while (currentNode !== null) {
            values.push(currentNode.value);
            currentNode = currentNode.next;

            // Prevent infinite loop in circular list
            if (this.circular === true && currentNode === this.firstNode) {
                break;
            }
        }

        return values;
    }
}
