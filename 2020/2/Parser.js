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
            const [policy, password] = line.split(': ');
            const [amounts, character] = policy.split(' ');
            const [min, max] = amounts.split('-').map(number => number - 0);
            return {min, max, character, password};
        });
    }
}
