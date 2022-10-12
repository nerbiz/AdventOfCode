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
            const [type, value] = line.split(' = ');

            if (type === 'mask') {
                return {type, value};
            }

            return {
                address: type.replace(/\D/g, '') - 0,
                value: value - 0,
            };
        });
    }
}
