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
            const [id, content] = line.split(' @ ');
            let [coordinates, size] = content.split(': ');
            coordinates = coordinates.split(',').map(number => number - 0);
            size = size.split('x').map(number => number - 0);

            return {
                x: coordinates[0],
                y: coordinates[1],
                width: size[0],
                height: size[1],
            };
        });
    }
}
