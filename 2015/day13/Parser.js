export default class Parser
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {array}
     */
    parse(linesArray)
    {
        const lineRegExp = /([^\s]+).+(gain|lose) (\d+).+ ([^\s]+)\./i;

        return linesArray.map(line => {
            const [match, person, change, amount, nextTo] = line.match(lineRegExp);

            return {
                person,
                nextTo,
                score: parseInt((change === 'lose') ? amount * -1 : amount, 10)
            };
        });
    }
}
