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
            liters: parseInt(linesArray[0].replace(/[^\d]+/, ''), 10),
            containers: linesArray.slice(2).map(number => parseInt(number, 10)),
        };
    }
}
