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
     * @param {number} times
     * @returns {void}
     */
    run(times)
    {
        for (let i = 0; i < this.tests.length; i++) {
            const timerName = 'Test ' + i + ' took';
            console.time(timerName);
            this.tests[i]();
            console.timeEnd(timerName);
        }
    }
}
