export default class Parser
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {array}
     */
    parse(linesArray)
    {
        const lineRegExp = /(\d+).*?(\d+).*points (?:\((.+)\) )?with.*?(\d+) (\w+).*?(\d+)/;
        let currentArmy = 'immuneSystem';
        const groups = [];

        while (linesArray.length > 0) {
            const line = linesArray.shift();
            if (line.match(':') !== null) {
                continue;
            } else if (line === '') {
                currentArmy = 'infection';
                continue;
            }

            // Get values from the line
            let [, units, hitPoints, properties, damage, attackType, initiative] = line.match(lineRegExp);

            const group = {
                army: currentArmy,
                units: units - 0,
                hitPoints: hitPoints - 0,
                damage: damage - 0,
                attackType,
                initiative: initiative - 0,
            };

            if (properties !== undefined) {
                properties.split('; ')
                    .map(property => {
                        let [type, attacks] = property.split(' to ');
                        attacks = attacks.split(', ');
                        group[type] = attacks;
                    });
            }

            groups.push(group);
        }

        return groups;
    }
}
