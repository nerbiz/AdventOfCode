export default class Parser
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {object}
     */
    parse(linesArray)
    {
        const scan = [];
        let minX = Infinity;
        let maxX = 0;
        let minY = Infinity;
        let maxY = 0;

        linesArray.forEach(line => {
            const [start, range] = line.split(', ');
            const [startCoordinate, startPosition] = start.split('=');
            const [rangeCoordinate, rangePositions] = range.split('=');

            const entry = {
                [startCoordinate]: [startPosition - 0, startPosition - 0],
                [rangeCoordinate]: rangePositions.split('..').map(number => number - 0),
            };

            minX = Math.min(minX, ...entry.x);
            maxX = Math.max(maxX, ...entry.x);
            minY = Math.min(minY, ...entry.y);
            maxY = Math.max(maxY, ...entry.y);

            scan.push(entry);
        });

        return {scan, minX, maxX, minY, maxY};
    }
}
