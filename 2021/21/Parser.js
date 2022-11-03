export default class Parser
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {array}
     */
    parse(linesArray)
    {
        return [
            linesArray.at(0).split(' ').at(-1) - 0,
            linesArray.at(1).split(' ').at(-1) - 0,
        ];
    }
}
