export default class
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
            const [fromX, toX] = left.split(',').map(number => parseInt(number, 10));
            const [fromY, toY] = right.split(',').map(number => parseInt(number, 10));

            coordinates.push({
                from: {x: fromX, y: toX},
                to: {x: fromY, y: toY},
            });
        });

        return coordinates;
    }
}
