export default class Parser
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {array}
     */
    parse(linesArray)
    {
        return {
            deckSize: linesArray.shift().match(/\d+/) - 0,
            steps: linesArray.map(line => {
                if (line.match('new')) {
                    return ['new'];
                } else if (line.match('increment')) {
                    return ['increment', line.match(/\d+/) - 0];
                } else {
                    return ['cut', line.split(' ')[1] - 0];
                }
            }),
        };
    }
}
