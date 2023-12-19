export default class Parser
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {object}
     */
    parse(linesArray)
    {
        const workflows = {};
        let line;
        while ((line = linesArray.shift()) !== '') {
            let [name, rules] = line.split('{');

            workflows[name] = rules.slice(0, -1)
                .split(',')
                .map((rule, index, all) => {
                    if (index === all.length - 1) {
                        // The last rule must always match
                        return { category: 'x', compare: '<', value: Infinity, next: rule };
                    }

                    // Extract parts from the rule
                    const [, category, compare, value, next] = rule.match(/(.+)([<>])(.+):(.+)/);
                    return { category, compare, value: value - 0, next };
                });
        }

        return {
            workflows,
            parts: linesArray.map(part => Object.fromEntries(
                part.slice(1, -1)
                    .split(',')
                    // Create category:value pairs
                    .map(category => {
                        const [name, value] = category.split('=');
                        return [name, value - 0];
                    })
            )),
        };
    }
}
