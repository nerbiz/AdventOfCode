export default class Benchmark
{
    /**
     * An array of tests
     * @type {array}
     */
    tests;

    /**
     * @param {...function} tests
     * @constructor
     */
    constructor(...tests)
    {
        this.tests = tests;
    }

    /**
     * Run the test cases
     * @param {number} rounds
     * @returns {void}
     */
    run(rounds)
    {
        // Loop over all the tests
        for (let testIndex = 0; testIndex < this.tests.length; testIndex++) {
            const timerName = 'Test ' + (testIndex + 1);
            console.time(timerName);

            // Execute each test the given amount of times
            for (let round = 0; round < rounds; round++) {
                this.tests[testIndex]();
            }

            console.timeEnd(timerName);
        }
    }
}
