export default class Parser
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {object}
     */
    parse(linesArray)
    {
        const getStoreItems = type => {
            // Find the line index of where the items start
            const startIndex = linesArray.findIndex(line => line.startsWith(type)) + 1;

            return linesArray.slice(startIndex, linesArray.indexOf('', startIndex))
                .map(line => line.match(/([^\s]+(?: *\+\d)?) +([^\s]+) +([^\s]+) +([^\s]+)/))
                // Put the item properties in an object
                .map(matches => ({
                    name: matches[1],
                    cost: parseInt(matches[2], 10),
                    damage: parseInt(matches[3], 10),
                    armor: parseInt(matches[4], 10),
                }));
        };

        const statNames = ['hitPoints', 'damage', 'armor'];
        const getStats = characterName => {
            return linesArray.filter(line => line.startsWith(characterName))
                .map(line => parseInt(line.replace(/[^\d]+/g, ''), 10))
                // Put the numbers in a stats object
                .reduce((character, number, index) => {
                    character[statNames[index]] = number;
                    return character;
                }, {});
        };

        return {
            store: {
                weapons: getStoreItems('Weapons'),
                armor: getStoreItems('Armor'),
                rings: getStoreItems('Rings'),
            },
            player: getStats('Player'),
            boss: getStats('Boss'),
        };
    }
}
