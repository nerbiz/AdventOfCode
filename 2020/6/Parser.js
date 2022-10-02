export default class Parser
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {array}
     */
    parse(linesArray)
    {
        const groups = [];
        let group = [];

        while (linesArray.length > 0) {
            const line = linesArray.shift();
            if (line === '') {
                groups.push(group);
                group = [];
                continue;
            }

            group.push(line);
        }

        groups.push(group);
        return groups;
    }
}
