export default class Parser
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {object}
     */
    parse(linesArray)
    {
        const pageOrdering = [];

        while (linesArray.length > 0) {
            const line = linesArray.shift();

            if (line === '') {
                break;
            }

            pageOrdering.push(line.split('|'));
        }

        const updates = linesArray.map(line => line.split(','));

        return {
            pageOrdering,
            updates,
        };
    }
}
