export default class Parser
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {array}
     */
    parse(linesArray)
    {
        return linesArray.map(line => {
            const [w, x, y, z] = line.split(',').map(number => number - 0);
            return {w, x, y, z};
        });
    }
}
