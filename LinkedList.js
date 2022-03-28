export class LinkedListNode
{
    /**
     * The value of the node
     * @type {any}
     */
    value;

    /**
     * The previous linked node
     * @type {LinkedListNode}
     */
    previous;

    /**
     * The next linked node
     * @type {LinkedListNode}
     */
    next;

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
            this.firstNode.previous = this.firstNode;
            this.firstNode.next = this.firstNode;
            return;
        }

        // Add the new node at the end and update relations
        const lastNode = this.firstNode.previous;
        lastNode.next = newNode;
        this.firstNode.previous = newNode;
        newNode.previous = lastNode;
        newNode.next = this.firstNode;

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

        // Add the new node and update relations
        newNode.previous = node.previous;
        newNode.next = node;
        node.previous.next = newNode;
        node.previous = newNode;

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

        // Add the new node and update relations
        newNode.previous = node;
        newNode.next = node.next;
        node.next.previous = newNode;
        node.next = newNode;

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

        return this.firstNode.previous;
    }

    /**
     * Get a previous node, any amount of steps to the left
     * @param node
     * @param steps
     * @returns {LinkedListNode}
     */
    getPrevious(node, steps = 1)
    {
        let previousNode = node;
        for (let i = 0; i < steps; i++) {
            previousNode = previousNode.previous;
        }

        return previousNode;
    }

    /**
     * Get a next node, any amount of steps to the right
     * @param node
     * @param steps
     * @returns {LinkedListNode}
     */
    getNext(node, steps = 1)
    {
        let nextNode = node;
        for (let i = 0; i < steps; i++) {
            nextNode = nextNode.next;
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
        this.firstNode.previous.next = null;
        this.firstNode.previous = null;
        this.firstNode.next = null;
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
        while (true) {
            values.push(currentNode.value);
            currentNode = currentNode.next;

            // Prevent infinite loop, nodes wrap from last to first
            if (currentNode === this.firstNode) {
                break;
            }
        }

        return values;
    }
}
