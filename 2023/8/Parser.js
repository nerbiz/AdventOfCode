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
            instructions: linesArray.at(0).split(''),
            network: Object.fromEntries(
                linesArray.slice(2).map(line => {
                    const [node, next] = line.split(' = ');
                    return [
                        node,
                        next.substring(1, next.length - 1).split(', '),
                    ];
                }),
            )
        };
    }
}
