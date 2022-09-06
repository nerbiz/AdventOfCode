export default class Parser
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {object}
     */
    parse(linesArray)
    {
        return {
            steps: linesArray.shift().match(/\d+/)[0] - 0,
            positions: linesArray.map(line => {
                const coordinates = line.slice(1, -1)
                    .split(', ')
                    .map(coordinate => coordinate.match(/-?\d+/)[0]);

                return {
                    x: coordinates[0] - 0,
                    y: coordinates[1] - 0,
                    z: coordinates[2] - 0,
                };
            }),
        };
    }
}
