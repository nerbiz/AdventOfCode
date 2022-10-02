export default class Parser
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {array}
     */
    parse(linesArray)
    {
        const passports = [];
        let passport = {};

        while (linesArray.length > 0) {
            const line = linesArray.shift();
            if (line === '') {
                passports.push(passport);
                passport = {};
                continue;
            }

            line.split(' ')
                .map(field => field.split(':'))
                .forEach(entry => {
                    const [field, value] = entry;
                    passport[field] = value;
                });
        }

        passports.push(passport);
        return passports;
    }
}
