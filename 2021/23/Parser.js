export default class Parser
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {object}
     */
    parse(linesArray)
    {
        // Add empty spaces to make lines equal length
        linesArray[3] += '  ';
        linesArray[4] += '  ';

        return linesArray.map(line => line.split(''));
    }
}
