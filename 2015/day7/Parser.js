import Utilities from '../../Utilities.js';

export default class Parser
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {object}
     */
    parse(linesArray)
    {
        // Get all the wire identifiers
        const wireIds = linesArray.join(' ')
            .replace(/AND|OR|LSHIFT|RSHIFT|NOT|\d+|->/g, '')
            .replace(/([a-z]+)/g, '$1,')
            .replaceAll(' ', '')
            .replace(/,$/, '')
            .split(',');

        return {
            wireIds: Utilities.arrayUnique(wireIds),
            instructions: linesArray.map(line => {
                const [operation, wireId] = line.split(' -> ');
    
                return {
                    wireId,
                    operation: operation.split(' '),
                    // Resolving callback is created later
                    resolve: undefined,
                    isResolved: false,
                };
            }),
        };
    }
}
