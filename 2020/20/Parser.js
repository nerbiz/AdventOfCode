export default class Parser
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {array}
     */
    parse(linesArray)
    {
        const tiles = [];
        while (linesArray.length > 0) {
            tiles.push({
                id: linesArray.shift().replaceAll(/\D/g, '') - 0,
                grid: linesArray.splice(0, 10)
                    .map(row => row
                        .replaceAll('.', '0')
                        .replaceAll('#', '1')
                        .split('')
                    ),
            });

            linesArray.shift();
        }

        return tiles;
    }
}
