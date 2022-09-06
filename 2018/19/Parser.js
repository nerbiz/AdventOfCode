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
            pointer: linesArray.shift().slice(-1) - 0,
            instructions: linesArray.map(line => {
                const [operation, a, b, c] = line.split(' ');
                return [operation, a - 0, b - 0, c - 0];
            }),
        };
    }
}
