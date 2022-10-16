export default class Parser
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {object}
     */
    parse(linesArray)
    {
        const fields = {};
        while (true) {
            const line = linesArray.shift();
            if (line === '') {
                break;
            }

            let [field, ranges] = line.split(': ');
            ranges = ranges.split(' or ')
                .map(range => range.split('-').map(number => number - 0));

            fields[field] = ranges;
        }

        linesArray.shift();
        const ticket = linesArray.shift().split(',').map(number => number - 0);

        linesArray.shift();
        linesArray.shift();
        const nearbyTickets = [];
        while (linesArray.length > 0) {
            nearbyTickets.push(
                linesArray.shift().split(',').map(number => number - 0)
            );
        }

        return {fields, ticket, nearbyTickets};
    }
}
