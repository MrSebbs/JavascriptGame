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
				
		game.render();
		
		game.pollEvent();
		
		var now = getTime();
		var dt = (now - last_time) * 0.001;
		last_time = now;
		game.time = now * 0.001;

		game.update(dt);
	}
	
}