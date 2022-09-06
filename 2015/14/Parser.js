export default class Parser
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {array}
     */
    parse(linesArray)
    {
        const lineRegExp = /([^\s]+).*?(\d+).*?(\d+).*?(\d+)/;

        return linesArray.map(line => {
            const [match, name, speed, duration, rest] = line.match(lineRegExp);

            return {
                name,
                speed: parseInt(speed, 10),
                duration: parseInt(duration, 10),
                rest: parseInt(rest, 10),
            };
        });
    }
}
