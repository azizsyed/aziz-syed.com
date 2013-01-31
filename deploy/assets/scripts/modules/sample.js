var SampleApplication = (function () {
    function SampleApplication() {
    }
    SampleApplication.prototype.testMethod = function (sample, tbd) {
        return sample;
    };
    return SampleApplication;
})();
var sampleApplication = new SampleApplication();
sampleApplication.testMethod('sample', 4);
