import Utilities from '../../Utilities.js';

export default class
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {object}
     */
    parse(linesArray)
    {
        const target = linesArray[0].replace('target area: ', '')
            .replace('x=', '')
            .replace('y=', '')
            .split(', ')
            .map(minMax => minMax.split('..'))
            .flat()
            .map(number => parseInt(number, 10));
        
        return {
            xMin: target[0],
            xMax: target[1],
            yMin: target[2],
            yMax: target[3],
        };
    }
}
