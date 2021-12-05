export default class
{
    constructor()
    {
        this.parsedData = {};
    }

    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {object} Key:value pairs of parsed data
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

        this.parsedData = { coordinates };

        return this.parsedData;
    }
}
