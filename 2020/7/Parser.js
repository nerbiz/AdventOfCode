export default class Parser
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {array}
     */
    parse(linesArray)
    {
        return linesArray.map(rule => {
            const [colour, contentsString] = rule.split(' bags contain ');

            const contents = [];
            for (const matches of contentsString.matchAll(/(\d+) ([a-z]+ [a-z]+)/g)) {
                contents.push({
                    colour: matches[2],
                    amount: matches[1] - 0,
                });
            }

            return [colour, contents];
        });
    }
}
