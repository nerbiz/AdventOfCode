export default class
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {array}
     */
    parse(linesArray)
    {
        return linesArray.map(line => {
            let [date, event] = line.slice(1).split('] ');
            date = new Date(date);

            const [part1, part2] = event.split(' ');
            const status = (part1 === 'falls') ? 'asleep' : 'awake';

            return {
                date,
                guardId: part2.startsWith('#') ? part2.replace('#', '') - 0 : undefined,
                status,
            };
        });
    }
}
