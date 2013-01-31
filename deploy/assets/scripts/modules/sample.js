var SampleApplication = (function () {
    function SampleApplication() {
    }
    SampleApplication.prototype.testMethod = function (sample, tbd) {
        this.greeting = sample;
        this.tbd = tbd;
        return sample;
    };
    return SampleApplication;
})();
var sampleApplication = new SampleApplication();
sampleApplication.testMethod('sample', 4);
