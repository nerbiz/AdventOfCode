export default class Parser
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {array}
     */
    parse(linesArray)
    {
        return linesArray.map(line => line.replace(',', '').split(' '))
            .map(parts => {
                if (parts[1].match(/\d/) !== null) {
                    parts[1] = parseInt(parts[1], 10);
                }

                if (parts[2] !== undefined) {
                    parts[2] = parseInt(parts[2], 10);
                }

                return parts;
            });
    }
}
