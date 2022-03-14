export default class Parser
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {array}
     */
    parse(linesArray)
    {
        const coordinates = [];

        linesArray.forEach(line => {
            const [left, right] = line.split(' -> ');
            
            // Parse the 'from' and 'to' coordinates
            const [fromX, fromY] = left.split(',').map(number => parseInt(number, 10));
            const [toX, toY] = right.split(',').map(number => parseInt(number, 10));

            coordinates.push({
                from: {x: fromX, y: fromY},
                to: {x: toX, y: toY},
            });
        });

        return coordinates;
    }
}
