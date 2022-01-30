class Player{
	//Constructor
	constructor(){
		this.x = 0;
		this.y = 0;
		this.vision = zeros([rows, cols]);
	}

	//Vision	
	checkVision(){
		this.vision[this.x][this.y] = 1;
		let dir = [[0,-1], [-1,0], [1,0], [0,1]];
		let x1, y1;
		for(let k = 0; k < 4; k++){
			x1 = this.x;
			y1 = this.y;
			while(x1 > -1 && x1 < rows && y1 > -1 && y1 < cols && maze.nodes[x1][y1][k] == 1){
				x1 = x1 + dir[k][0];
				y1 = y1 + dir[k][1];
				this.vision[x1][y1] = 1;
			}
		}
		if(this.x == rows - 1 && this.y == cols - 1){
			setTimeout(()=>{}, 1000);
			state = 2;
		}
	}

	//Movement
	moveLeft(){
		if(this.x > 0 && maze.nodes[this.x][this.y][1] != 0)this.x--;
	}	
	moveRight(){
		if(this.x < rows - 1 && maze.nodes[this.x][this.y][2] != 0)this.x++;
	}
	moveUp(){
		if(this.y > 0 && maze.nodes[this.x][this.y][0] != 0)this.y--;
	}
	moveDown(){
		if(this.y < cols - 1 && maze.nodes[this.x][this.y][3] != 0)this.y++;
	}

	//Draw
	drawCharacter(){
		fill("#FE7F2D");
		stroke("#FE7F2D");
		strokeWeight(1);
		circle((this.x+0.5)*rowsSpace, (this.y+0.5)*rowsSpace, 0.70*rowsSpace);
		if(!memoryMode)this.vision = zeros([rows, cols]);
		//Vision
		//this.vision = zeros([rows, cols]);
		fill("#2F2F2F");
		stroke("#2F2F2F");
		this.checkVision();
		for(let i = 0; i < rows; i++){
			for(let j = 0; j < cols; j++){
				if(!this.vision[i][j])rect(i*rowsSpace, j*colsSpace, rowsSpace, colsSpace);
			}
		}
	}

	//Reset
	reset(){
		this.x = 0;
		this.y = 0;
		this.vision = zeros([rows, cols]);
	}
}
