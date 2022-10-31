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
            const [status, axes] = line.split(' ');

            return [
                (status === 'on'),
                ...axes.split(',')
                    .map(axis => axis
                        .slice(2)
                        .split('..')
                        .map(number => number - 0)
                    )
            ];
        });
    }
}
