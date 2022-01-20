export default class
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {object}
     */
    parse(linesArray)
    {
        const [row, column] = linesArray.at(0)
            .match(/\d+/g)
            .map(number => parseInt(number, 10));

        return {row, column};
    }
}
