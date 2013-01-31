$LAB.setGlobalDefaults({
	'BasePath': 'assets/scripts/'
});

$LAB
	.script("modules/app.js")
	.wait(function(){
		var application = new Application();
		application.testMethod();
	})
;