export default class
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {array}
     */
    parse(linesArray)
    {
        const rules = linesArray.map(line => {
            const rule = line.split(' => ');
            rule[1] = rule[1].split('/')
                .map(row => row.split(''));

            return rule;
        });

        return Object.fromEntries(rules);
    }
}
