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
            number: linesArray.at(0).match(/\d+/) - 0,
            target: linesArray.at(1).split(' ')
                .at(1).split(',').map(number => number - 0),
        };
    }
}
