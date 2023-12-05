export default class Parser
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {object}
     */
    parse(linesArray)
    {
        const seeds = linesArray
            .shift().split(': ').at(1)
            .split(' ').map(number => number - 0);

        const mappings = {};
        let mappingName = '';
        let mappingValues = [];
        const connections = {};

        for (const line of linesArray) {
            if (line === '') {
                if (mappingName === '') {
                    continue;
                }

                mappings[mappingName] = mappingValues;
                mappingName = '';
                mappingValues = [];
            } else if (line.endsWith('map:')) {
                const names = line.split(' ').at(0).split('-to-');
                mappingName = names[0];
                connections[names[0]] = names[1];
            } else {
                mappingValues.push(line.split(' ').map(number => number - 0));
            }
        }

        return { seeds, mappings, connections };
    }
}
