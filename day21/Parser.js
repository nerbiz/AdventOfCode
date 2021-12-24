export default class
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {object}
     */
    parse(linesArray)
    {
        return {
            1: parseInt(linesArray.shift().at(-1), 10),
            2: parseInt(linesArray.shift().at(-1), 10),
        };
    }
}
