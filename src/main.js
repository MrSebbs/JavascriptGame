var context;
var game;

var last_time = 0;

function init()
{
	context = GL.create({ width: window.innerWidth, height: window.innerHeight });
	game = new Game(context);

	//	Attach to DOM
	document.body.appendChild(game.renderer.canvas);

	game.init();

	mainLoop();	
}

//	Main render loop
function mainLoop()
{	
	requestAnimationFrame(animate);
	function animate() {
		requestAnimationFrame( animate );
		
		var now = getTime();
		var dt = (now - last_time) * 0.001;
		last_time = now;
		game.time = now * 0.001;

		game.update(dt);
	}
	
	
	// Pendent de passar-ho al main!!!!
	//	Input
	game.renderer.context.captureMouse();
	game.renderer.context.onmousemove = function(e)
	{
		if(e.dragging)
			game.box.rotate( e.deltax * 0.01, RD.UP );
	}
}