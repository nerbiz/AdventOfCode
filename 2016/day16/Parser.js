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
            diskLength: linesArray.at(0).match(/\d+/) - 0,
            initialState: linesArray.at(1).split(' ').at(-1),
        };
    }
}
