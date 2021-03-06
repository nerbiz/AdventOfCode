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
            rows: linesArray.at(0).match(/\d+/) - 0,
            firstRow: linesArray.at(1).split(' ').at(2).split(''),
        };
    }
}
