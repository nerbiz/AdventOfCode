export default class
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {array}
     */
    parse(linesArray)
    {
        return linesArray.map(line => {
            let [parts, checksum] = line.replace(']', '').split('[');
            parts = parts.split('-');

            return {
                sectorId: parseInt(parts.pop(), 10),
                name: parts.join('-'),
                checksum,
            };
        });
    }
}
