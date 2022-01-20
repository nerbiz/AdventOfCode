export default class
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {array}
     */
    parse(linesArray)
    {
        return {
            dots: linesArray.slice(0, linesArray.indexOf(''))
                .map(line => {
                    const [x, y] = line.split(',');
                    return {
                        x: parseInt(x, 10),
                        y: parseInt(y, 10),
                    };
                }),
            folds: linesArray.filter(line => line.startsWith('fold'))
                .map(line => line.replace('fold along ', '').split('='))
                .map(fold => {
                    const obj = {};
                    obj[fold[0]] = parseInt(fold[1], 10);
                    return obj;
                }),
        };
    }
}
