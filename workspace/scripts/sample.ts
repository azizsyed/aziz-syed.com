class SampleApplication {
	greeting: string;
	tbd: number;
    constructor() {
    }
    testMethod(sample: string, tbd: number) {
		this.greeting = sample;
		this.tbd = tbd;
        return sample;
    }
}

var sampleApplication = new SampleApplication();

sampleApplication.testMethod('sample', 4);