function Game(context)
{
	this.scene = new RD.Scene();
	this.renderer = new RD.Renderer(context);
	
	this.camera;
	this.box;
	this.bg_color;
	
	this.time;	
}

Game.prototype.init = function()
{
	// Init camera
	this.camera = new RD.Camera();
	this.camera.perspective( 45, gl.canvas.width / gl.canvas.height, 1, 1000 );
	this.camera.lookAt( [100,100,100],[0,0,0],[0,1,0] );
	
	// Init box
	this.box = new RD.SceneNode();
	this.box.position = [0,0,0];
	this.box.color = [1,0,0,1];
	this.box.mesh = "cube";
	this.box.shader = "phong";
	this.box.scale([50,50,50]);
	
	this.box.update = function(dt) { 
		this.rotate(dt * 0.1,RD.UP);
		this.color[1] = Math.sin( getTime() * 0.001 );
		this.color[2] = 1.0 - this.color[1];
	}
	this.scene.root.addChild(this.box);
	
	
	this.bg_color = vec4.fromValues(0.2,0.3,0.4,1);
}

Game.prototype.render = function(dt)
{
	this.renderer.clear(this.bg_color);
	this.renderer.render(this.scene, this.camera);
}

Game.prototype.update = function(dt)
{
	var speed = dt * 100;
	
	//	Camera movement
	var camera = this.camera;
	context.onmousemove = function(e)
	{
		if(e.dragging & this.mouse.left_button != 0){
			camera.rotate(e.deltax * 0.002, camera._up);
			camera.rotate(e.deltay * 0.002, camera._right);
			console.log(game.renderer.context.mouse.left_button);
		}
	}
	
//	if ((mouse_state & SDL_BUTTON_LEFT) || mouse_locked ) //is left button pressed?
//	{
//		camera->rotate(mouse_delta.x * 0.005, Vector3(0,-1,0));
//		camera->rotate(mouse_delta.y * 0.005, camera->getLocalVector( Vector3(-1,0,0)));
//	}
	
	this.scene.update(dt);
	this.time = getTime();
}

Game.prototype.pollEvent = function()
{
	context.captureKeys();
	context.captureMouse();
}



