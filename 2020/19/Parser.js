export default class Parser
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {object}
     */
    parse(linesArray)
    {
        const rules = [];
        let line;
        while ((line = linesArray.shift()) !== '') {
            const [index, rule] = line.split(': ');

            rules[index] = rule.split(' | ').map(parts =>
                (parts.includes('"'))
                    ? parts.replaceAll('"', '')
                    : parts.split(' ')
            );
        }

        return {rules, messages: linesArray};
    }
}
