export default class Parser
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {object}
     */
    parse(linesArray)
    {
        const blueprints = {
            currentState: linesArray.shift().slice(-2, -1),
            stepsRequired: linesArray.shift().match(/\d+/) - 0,
            stateActions: {},
        };

        while (linesArray.length > 0) {
            // Remove the line in between
            linesArray.shift();

            let stateLines = linesArray.splice(0, 9);
            const stateLetter = stateLines.shift().slice(-2, -1);
            blueprints.stateActions[stateLetter] = [];

            // Keep only the actions lines
            stateLines = stateLines.filter(line => line.trim().startsWith('-'));
            for (let i = 0; i < 2; i++) {
                blueprints.stateActions[stateLetter].push({
                    write: stateLines[(3 * i) + 0].slice(-2, -1) - 0,
                    move: stateLines[(3 * i) + 1].includes('left') ? -1 : 1,
                    nextState: stateLines[(3 * i) + 2].slice(-2, -1),
                });
            }
        }

        return blueprints;
    }
}
