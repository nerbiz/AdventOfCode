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
            deckSize: linesArray.shift().match(/\d+/) - 0,
            steps: linesArray.map(line => {
                const [, type, amount] = line.match(/(new|cut|increment).*? (-?\d+)?/);
                return [type, amount - 0];
            }),
        };
    }
}
