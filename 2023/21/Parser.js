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
            steps: linesArray.shift().split(' ').at(1) - 0,
            map: linesArray.map(line => line.split('')),
        };
    }
}
