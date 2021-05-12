class Maze{

  constructor(n, m){
	this.nodes = zeros([rows,cols,4]);
  }

  GenerateMaze(seed){
    console.log("hi");
    let myrng = new Math.seedrandom(seed);
    let dir = [[0,-1], [-1,0], [1,0], [0,1]];
    let sides;
    for(let i = 0; i < this.nodes.length; i++){
      for(let j = 0; j < this.nodes[i].length; j++){
        sides = [];
        if(j != 0 && this.nodes[i][j][0] != 1)sides.push(0);
        if(j != this.nodes.length - 1 && this.nodes[i][j][3] != 1)sides.push(3);
        if(i != 0 && this.nodes[i][j][1] != 1)sides.push(1);
        if(i != this.nodes[i].length - 1 && this.nodes[i][j][2] != 1)sides.push(2);
	let ran = (int)(myrng.quick() * sides.length);
	if(!sides[ran])continue;
        this.nodes[i][j][sides[ran]] = 1;
	this.nodes[i+dir[sides[ran]][0]][j+dir[sides[ran]][1]][kP(sides[ran])] = 1;
      }
    }
    //Connect islands
    //Know its an island
    let grid, stack, island = 3;
    while(island > 2){
	    grid = zeros([this.nodes.length, this.nodes[0].length]);
	    stack = [];
	    island = 1;
	    for(let i = 0; i < this.nodes.length; i++){
	      for(let j = 0; j < this.nodes[i].length; j++){
		if(grid[i][j] != 0)continue;
		stack.push([i,j]);
		while(stack.length != 0){
		  let cords = stack.pop();
		  let i1 = cords[0];
		  let j1 = cords[1];
		  grid[i1][j1] = island;
		  for(let k = 0; k < 4; k++){
		    let x = i1+dir[k][0]
		    let y = j1+dir[k][1]
		    if(this.nodes[i1][j1][k] == 1 && x > -1 && x < this.nodes.length && y > -1 && y < this.nodes[0].length && grid[x][y] == 0){
		      stack.push([x, y]);
		    }
		  }
		}
		island++;
	      }
	    }
	    if(island == 2)break;
	    //Get borders
	    let borders = [];
	    for(let i = 0; i < island; i++){
	      borders.push([]);
	    }
	    for(let i = 0; i < this.nodes.length; i++){
	      for(let j = 0; j < this.nodes[i].length; j++){
		for(let k = 0; k < 4; k++){
		  let x = i+dir[k][0]
		  let y = j+dir[k][1]
		  if(x > -1 && x < this.nodes.length && y > -1 && y < this.nodes[0].length && grid[i][j] != grid[x][y]){
		    borders[grid[i][j]].push([i, j, k]);
		  }
		}
	      }
	    }
	    //Assign borders
	    let visited = zeros([island+1,island+1])
	    let islands = [];
	    for(let i = 1; i < island; i++){
	      islands.push(i);
	    }
	    for(let a = 0; a < island-1; a++){
	      let is = islands.splice((int)(myrng.quick()*islands.length), 1)[0];
	      let chosen, i , j, k;
	      do{
		chosen = borders[is].splice((int)(myrng.quick()*borders[is].length), 1)[0];
		i = chosen[0]
		j = chosen[1]
		k = chosen[2]
	      }while(borders[is].length != 0 && visited[grid[i][j]][grid[i+dir[k][0]][j+dir[k][1]]] != 0);
	      visited[grid[i][j]][grid[i+dir[k][0]][j+dir[k][1]]] = 1
	      visited[grid[i+dir[k][0]][j+dir[k][1]]][grid[i][j]] = 1
	      this.nodes[i][j][k] = 1;
	      this.nodes[i+dir[k][0]][j+dir[k][1]][kP(k)] = 1;
	    }
  	}
  }

  drawMaze(){
    stroke("#233D4D");
    strokeCap(SQUARE);
    strokeWeight(width/100);
    for(let i = 0; i < this.nodes.length; i++){
      for(let j = 0; j < this.nodes[i].length; j++){
        for(let k = 0; k < 4; k++){
          if(this.nodes[i][j][k] == 1){
            //Up
	    if(k == 0){
              line(i*rowsSpace+lineSpace, j*colsSpace, (i+1)*rowsSpace-lineSpace, j*colsSpace);
            }
            //Left
            else if(k == 1){
              line(i*rowsSpace, j*colsSpace+lineSpace, i*rowsSpace, (j+1)*colsSpace-lineSpace);
            }
            //Right
            else if(k == 2){
              line((i+1)*rowsSpace, j*colsSpace+lineSpace, (i+1)*rowsSpace, (j+1)*colsSpace-lineSpace);
            }
            //Down
            else if(k == 3){
              line(i*rowsSpace+lineSpace, (j+1)*colsSpace, (i+1)*rowsSpace-lineSpace, (j+1)*colsSpace)
            }
          }
        }
      }
    }
  }

	reset(){
		this.nodes = [];
		this.nodes = zeros([rows, cols, 4]);
	}
  
}
function kP(k){
	if(k == 0)return 3;
	if(k == 1)return 2;
	if(k == 2)return 1;
	if(k == 3)return 0;
}

function zeros(dimensions) {
    var array = [];
    for (var i = 0; i < dimensions[0]; ++i) {
        array.push(dimensions.length == 1 ? 0 : zeros(dimensions.slice(1)));
    }
    return array;
}
