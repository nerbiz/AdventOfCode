export default class PriorityQueue
{
    /**
     * The main queue
     * @type {array}
     */
    queue = [];

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
     * Get all the items currently in queue, in order
     * @return {array}
     */
    getAll()
    {
        return this.queue.map(item => item[1]);
    }

    /**
     * Add an item to the queue
     * @param {number} priority
     * @param {any} item
     * @returns {void}
     */
    enqueue(priority, item)
    {
        const entry = [priority, item];

        // See if the item needs to be the last in the queue
        if (this.isEmpty() || priority >= this.queue.at(-1)[0]) {
            this.queue.push(entry);
            return;
        }

        // See if the item needs to be the first in the queue
        if (priority <= this.queue.at(0)[0]) {
            this.queue.splice(1, 0, entry);
            return;
        }

        let minIndex = 0;
        let maxIndex = this.queue.length - 1;

        // Use a halving technique to find the insertion index
        while (maxIndex - minIndex > 1) {
            const middleIndex = Math.ceil((maxIndex - minIndex) / 2) + minIndex;

            if (priority < this.queue[middleIndex][0]) {
                maxIndex = middleIndex;
            } else {
                minIndex = middleIndex;
            }
        }

        this.queue.splice(maxIndex, 0, entry);
    }

    /**
     * See which item is next in the queue
     * @return {any}
     */
    peek()
    {
        return this.queue[0][1];
    }

    /**
     * Take the first item from the queue
     * @returns {any}
     */
    dequeue()
    {
        return this.queue.shift()[1];
    }
}
