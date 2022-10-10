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
            listSize: linesArray.at(0).split(': ').at(1) - 0,
            lengths: linesArray.at(1).split(': ').at(1).split(',').map(number => number - 0),
        };
    }
}
