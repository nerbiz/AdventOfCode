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
            pots: linesArray.at(0).split(': ').at(1),
            notes: Object.fromEntries(
                linesArray.slice(2).map(note => note.split(' => '))
            ),
        };
    }
}
