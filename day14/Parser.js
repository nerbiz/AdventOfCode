export default class
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {array}
     */
    parse(linesArray)
    {
        return {
            polymer: linesArray.shift(),
            rules: linesArray.slice(1).map(row => {
                const [pair, insert] = row.split(' -> ');
                return {pair, insert};
            }),
        };
    }
}
