export default class Parser
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {string}
     */
    parse(linesArray)
    {
        return linesArray.at(0).slice(1, -1);
    }
}
