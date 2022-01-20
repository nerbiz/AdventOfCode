export default class
{
    constructor() {
        this.hexBinMapping = {
            0: '0000',
            1: '0001',
            2: '0010',
            3: '0011',
            4: '0100',
            5: '0101',
            6: '0110',
            7: '0111',
            8: '1000',
            9: '1001',
            A: '1010',
            B: '1011',
            C: '1100',
            D: '1101',
            E: '1110',
            F: '1111',
        };
    }

    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {string}
     */
    parse(linesArray)
    {
        return linesArray.at(0)
            .split('')
            // Convert each hexadecimal character to binary
            .map(hexadecimal => this.hexBinMapping[hexadecimal])
            .join('');
    }
}
