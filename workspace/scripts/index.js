(function(){
	// create an new instance of a pixi stage
	var stage = new PIXI.Stage(0x66FF99);

	// create a renderer instance.
	var renderer = PIXI.autoDetectRenderer(400, 300);

	// add the renderer view element to the DOM
	document.body.appendChild(renderer.view);

	requestAnimFrame( animate );



	// create a texture from an image path
	//var texture = PIXI.Text("AZIZSYED");//.fromImage("http://www.goodboydigital.com/pixijs/examples/1/bunny.png");
	// create a new Sprite using the texture
	var bunny = new PIXI.Text("AZIZSYED");

	// center the sprites anchor point
	bunny.anchor.x = 0.5;
	bunny.anchor.y = 0.5;

	// move the sprite t the center of the screen
	bunny.position.x = 200;
	bunny.position.y = 150;

	stage.addChild(bunny);

	var x = 1;

	function animate() {

	    requestAnimFrame( animate );

	    // just for fun, lets rotate mr rabbit a little
	    bunny.rotation += 0.01;

	    // render the stage   
		renderer.render(stage);
	}
})();

(function(){
	var RAF = Modernizr.prefixed('requestAnimationFrame', window);
	
	canvas = document.querySelector('canvas#test')
	ctx = canvas.getContext('2d')

	onresize = function(){
	  canvas.width = canvas.clientWidth
	  canvas.height = canvas.clientHeight
	}
	onresize()

	/*
	onmousemove = function(e){
	  rect = canvas.getBoundingClientRect();
	  gravityPoint = {
	    x: e.clientX - rect.left,
	    y: e.clientY - rect.top
	  }
	}
	*/

	gravityPoint = {x:canvas.width/2,y:canvas.height/2}
	gravityStrength = 10
	particles = []

	calculate = function(){
	  for(var i=0;i<particles.length;i++){
	    p = particles[i]
	    x = gravityPoint.x-p.x
	    y = gravityPoint.y-p.y
	    a = x*x+y*y
	    a = a = a>100?gravityStrength/a:gravityStrength/100
	    p.xv = (p.xv+a*x)*0.99
	    p.yv = (p.yv+a*y)*0.99
	    p.x += p.xv
	    p.y += p.yv
	    p.a *= 0.99
	  }
	}

	draw = function(){
	  ctx.clearRect(0,0,canvas.width,canvas.height)
	  for(var i=0;i<particles.length;i++){
	    p = particles[i]
	    ctx.globalAlpha = p.a
	    ctx.fillStyle = p.c
	    ctx.beginPath()
	    ctx.arc(p.x,p.y,p.s,0,2*Math.PI)
	    ctx.fill()
	  }
	}

	newParticle = function(){
	  type = (Math.random()*2|0)
	  particles.push({
	    x:gravityPoint.x-5+10*Math.random(),
	    y:gravityPoint.y-5+10*Math.random(),
	    xv:type?18*Math.random()-9:24*Math.random()-12,
	    yv:type?18*Math.random()-9:24*Math.random()-12,
	    c:type?'rgb(255,'+((200*Math.random())|0)+','+((80*Math.random())|0)+')':'rgb(255,255,255)',
	    s:type?5+10*Math.random():1,
	    a:1
	  })
	  if(particles.length>700){particles.shift()}
	}

	setInterval(newParticle,50)

	loop = function(){
	  draw()
	  calculate()
	  RAF(loop)
	}
	RAF(loop)
})();
