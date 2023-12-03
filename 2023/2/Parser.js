import ArrayPrototype from '../../classes/ArrayPrototype.js';

ArrayPrototype.registerToObject();

export default class Parser
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {array}
     */
    parse(linesArray)
    {
        return linesArray
            .map(line => {
                let [gameId, sets] = line.split(': ');
                [, gameId] = gameId.split(' ');

                return {
                    id: gameId - 0,
                    sets: sets.split('; ')
                        .map(set => set.split(', ')
                            .map(content => {
                                const [amount, color] = content.split(' ');
                                return [color, amount - 0];
                            })
                            .toObject()
                        ),
                };
            });
    }
}
