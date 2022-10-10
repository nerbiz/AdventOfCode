export default class Parser
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {object}
     */
    parse(linesArray)
    {
        // Add empty spaces to finish the grid
        linesArray[3] = linesArray[3].concat(['  ']);
        linesArray[4] = linesArray[4].concat(['  ']);

        return linesArray.map(line => line.split(''));
    }
}
