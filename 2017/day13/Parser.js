export default class
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {array}
     */
    parse(linesArray)
    {
        return linesArray.map(line => {
            const [depth, range] = line.split(': ').map(number => number - 0);
            return {depth, range};
        });
    }
}
