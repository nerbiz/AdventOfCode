export default class Parser
{
    /**
     * Parse lines into data
     * @param {array} linesArray An array of lines from a file
     * @returns {array}
     */
    parse(linesArray)
    {
        return linesArray.map(line => {
            const [ingredients, allergens] = line.split(' (contains ');

            return {
                ingredients: ingredients.split(' '),
                allergens: allergens.replace(')', '').split(', '),
            };
        });
    }
}
