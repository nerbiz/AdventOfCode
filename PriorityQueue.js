export default class PriorityQueue
{
    constructor()
    {
        this.queue = [];
    }

    /**
     * Checks whether the queue is empty
     * @returns {boolean}
     */
    isEmpty()
    {
        return this.queue.length === 0;
    }

    /**
     * See if the queue contains a certain item
     * @param {any} item
     * @returns {boolean}
     */
    has(item)
    {
        for (const entry of this.queue) {
            if (entry[1] === item) {
                return true;
            }
        }

        return false;
    }

    /**
     * Add an item to the queue
     * @param {number} priority
     * @param {any} item
     * @returns {void}
     */
    enqueue(priority, item)
    {
        const insertBeforeIndex = this.queue.findIndex(entry => entry[0] > priority);

        const entry = [priority, item];
        if (insertBeforeIndex === -1) {
            this.queue.push(entry);
        } else {
            this.queue.splice(insertBeforeIndex, 0, entry);
        }
    }

    /**
     * Get the first item from the queue
     * @returns {any}
     */
    dequeue()
    {
        return this.queue.shift()[1];
    }
}
