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

            const step = {
                status: (status === 'on'),
                axes: {},
            };

            axes.split(',').forEach(coordinate => {
                const [axis, range] = coordinate.split('=');
                step.axes[axis] = range.split('..').map(number => number - 0);
            });

            return step;
        });
    }
}
