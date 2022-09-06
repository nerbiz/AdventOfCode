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
            const [places, distance] = line.split(' = ');
            const [from, to] = places.split(' to ');

            return {from, to, distance: parseInt(distance, 10)};
        });
    }
}
