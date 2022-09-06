export default class Parser
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {object}
     */
    parse(linesArray)
    {
        return linesArray
            .map(line => line.split(' '))
            .map(parts => parts[4] - 0);
    }
}
