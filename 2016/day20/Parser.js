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
            maxNumber: linesArray.at(0).match(/\d+/) - 0,
            ranges: linesArray.slice(1)
                .map(line => line.split('-').map(number => number - 0)),
        };
    }
}
