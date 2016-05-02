window.addEventListener("load",beg_func,false);
window.alert("Press Space to start the game.Press Down arrow key to start moving the snake");
/*Created by Ipsit Sahoo*/

var COLS=50,ROWS= 17,SPACE=0,SNAKE=1,FOOD=2,LEFT=0,UP=1,RIGHT=2,DOWN=3,KEY_LEFT=37,KEY_UP=38,KEY_RIGHT=39,KEY_DOWN=40,KEY_SPC=32,KEY_ESC=27,//Key numbers
canvas,	  /* HTMLCanvas */
context,//Get 2D form of input
keystate, /* keyboard inputs [escape does not work check back]*/
frames,   /* animating */
score,fr=0;	  /* number, keep track of the player score */
grid = {
	width: null, 
	height: null,
	grids: null,  
	init: function(d,c,r){
		this.width=c;
		this.height=r;
		this.grids=[];
		for (var x=0;x<c;x++) {
			this.grids.push([]);
			for (var y=0;y<r;y++) {
				this.grids[x].push(d);
			}
		}
	},
	set:function(val,x,y) {
		this.grids[x][y]=val; //Setting location of food and snake
	},
	get:function(x,y) {	//Getting location of food and snake
		return this.grids[x][y];
	}
}
snake ={
	direction:null,
	last:null,
	que:null,	 
	init:function(d, x, y) {
		this.direction=d;
		this.que=[];
		this.insert(x,y);
	},
	insert:function(x,y) {
		this.que.unshift({x:x,y:y});
		this.last=this.que[0];
	},
	remove:function() {
		return this.que.pop();  //removing snake prev position every time it moves on
	}
};
function setBlob() {
	var space=[];
	for (var x=0;x<grid.width;x++) {
		for (var y=0;y<grid.height; y++) {
			if (grid.get(x,y) == SPACE) {
				space.push({x:x,y:y});
			}
		}
	}
	var rand=space[Math.round(Math.random()*(space.length - 1))];
	grid.set(FOOD,rand.x,rand.y);
	fr++;
}
function beg_func()//starts the game
{
	canvas=document.getElementById("canvas");
	canvas.width=COLS*20;
	canvas.height=ROWS*20;
	context=canvas.getContext("2d");
	frames=0;
	keystate={};
	//Adding and deleting keycode fro preventing recurrence
	document.addEventListener("keydown",function(e)
	{
		keystate[e.keyCode]=true;
	});
	document.addEventListener("keyup",function(e) 
	{
	    delete keystate[e.keyCode];
	});
	document.body.onkeyup = function(e){
    if(e.keyCode == KEY_SPC){
		document.getElementById("instr").innerHTML="The game has begun";
        init();//set or reset the game
		infinity();
		document.getElementById("sound").play();
    }
	}
	document.onkeyup = function(e){
    if(e.keyCode == KEY_ESC){
		location.reload();
    }
	}
}
function init()
{
	score=0;fr=0;
	grid.init(SPACE,COLS,ROWS);
	var snake_pos={x:0,y:0};
	snake.init(LEFT,snake_pos.x,snake_pos.y);
	grid.set(SNAKE,snake_pos.x,snake_pos.y);
	setBlob();
}
function infinity()
{
	update();
	draw();
	window.requestAnimationFrame(infinity,canvas);//60 fps????
}
function update()
{
	frames++;
	if(keystate[KEY_LEFT] && snake.direction !== RIGHT)
	{snake.direction=LEFT;}
	if(keystate[KEY_UP] && snake.direction !==DOWN)
	{snake.direction=UP;}
	if (keystate[KEY_RIGHT] && snake.direction !== LEFT) {snake.direction = RIGHT;}
	if (keystate[KEY_DOWN] && snake.direction !== UP) {snake.direction = DOWN;}
	if (frames%10 === 0) { //Optimum Speed setting for snake and pace of game
		var xcor = snake.last.x;
		var ycor = snake.last.y;//Recent coordinates of  x& y
		switch (snake.direction) {//Direction by arrow keys
			case LEFT:
				xcor--;
				break;
			case UP:
				ycor--;
				break;
			case RIGHT:
				xcor++;
				break;
			case DOWN:
				ycor++;
				break;
		}
		if (xcor<0 || xcor>grid.width-1 || ycor<0 || ycor>grid.height-1) //Boundary Conditions
		{
			return init();
		}
		if(grid.get(xcor,ycor)==SNAKE)
		{return init();}
		if (grid.get(xcor,ycor)==FOOD) {
			score++;
			setBlob();
		}
		else
		{
			var end=snake.remove();
			grid.set(SPACE,end.x,end.y);
		}
		grid.set(SNAKE,xcor,ycor);
		snake.insert(xcor,ycor);
	}
	
}
function draw() {
	// calculate tile-width and -height
	var tw = canvas.width/grid.width;
	var th = canvas.height/grid.height;
	// iterate through the grid and draw all cells
	for (var x=0; x < grid.width; x++) {
		for (var y=0; y < grid.height; y++) {
			// sets the fillstyle depending on the id of each block
			switch (grid.get(x, y)) {
				case SPACE:
					context.fillStyle = "brown";
					break;
				case SNAKE:
					context.fillStyle = "#CCFFFF";
					break;
				case FOOD:
					context.fillStyle = "yellow";
					break;
			}
			context.fillRect(x*tw, y*th, tw, th);
		}
	}
	var x=document.getElementById("score");
	x.innerHTML="Score:"+5*(fr-1);
	var y=document.getElementById("food");
	y.innerHTML="Food blocks eaten:"+(fr-1);
}
