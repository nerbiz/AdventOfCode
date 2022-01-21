export default class
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {object}
     */
    parse(linesArray)
    {
        return {
            spells: linesArray
                .slice(linesArray.findIndex(line => line.startsWith('Spells')) + 1)
                .map(line => line.match(/([^\d]+)(\d+) +(\d+) +(\d+) +(\d+) +(\d+) +(\d+)/))
                .map(matches => ({
                    name: matches[1].trim(),
                    cost: parseInt(matches[2], 10),
                    damage: parseInt(matches[3], 10),
                    heal: parseInt(matches[4], 10),
                    armor: parseInt(matches[5], 10),
                    mana: parseInt(matches[6], 10),
                    turns: parseInt(matches[7], 10),
                })),
            player: {
                hitPoints: parseInt(linesArray.at(0).replace(/[^\d]+/g, ''), 10),
                mana: parseInt(linesArray.at(1).replace(/[^\d]+/g, ''), 10),
            },
            boss: {
                hitPoints: parseInt(linesArray.at(2).replace(/[^\d]+/g, ''), 10),
                damage: parseInt(linesArray.at(3).replace(/[^\d]+/g, ''), 10),
            },
        };
    }
}
