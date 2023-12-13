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
            const [springs, amounts] = line.split(' ');
            return [springs, amounts.split(',').map(number => number - 0)];
        });
    }
}
