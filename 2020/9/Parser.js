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
            preamble: linesArray.shift().match(/\d+/) - 0,
            numbers: linesArray.map(number => number - 0),
        };
    }
}
