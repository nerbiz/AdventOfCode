export default class Parser
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {array}
     */
    parse(linesArray)
    {
        // Each row in the maze/grid needs to be equal width
        const mazeWidth = Math.max(...linesArray.map(line => line.length));

        return linesArray.map(line => line.padEnd(mazeWidth, ' ').split(''));
    }
}
