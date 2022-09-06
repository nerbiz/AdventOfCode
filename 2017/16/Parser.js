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
            programs: linesArray.at(0)
                .split(': ')
                .at(1),
            moves: linesArray.at(1)
                .split(',')
                .map(move => {
                    const part2 = move.substring(1);

                    return [move[0]].concat((part2.indexOf('/') === -1)
                        ? part2 - 0
                        : [...part2.split('/').map(item => item.match(/\d/) ? item - 0 : item)]);
                }),
        };
    }
}
