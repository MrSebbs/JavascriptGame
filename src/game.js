function Game(context)
{
	this.scene = new RD.Scene();
	this.renderer = new RD.Renderer(context);
	
	this.camera;
	this.box;
	this.bg_color;
	
	this.time = getTime();
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

Game.prototype.update = function(dt)
{
	this.renderer.clear(this.bg_color);
	this.renderer.render(this.scene, this.camera);
	this.scene.update(dt);
	this.time = getTime();
}
