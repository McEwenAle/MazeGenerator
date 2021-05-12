function drawMenu(){
	if(menuState == 0)drawMainMenu();
	if(menuState == 1)drawPlayMenu();
	if(menuState == 2)drawSettingsMenu();
} 

function drawMainMenu(){
	strokeWeight(1);
  	background("#233D4D");
	textSize(72);
	fill('#A1C181');
	text('Maze Generator', 145, 122);
	selectionBox(300, 234, 191, 73, 0);
	selectionBox(225, 356, 360, 78, 1);
	strokeWeight(1);
	fill('#A1C181')
	text('PLAY', 304, 297)
	text('SETTINGS', 225, 423)
}

function drawPlayMenu(){
	strokeWeight(1);
  	background("#233D4D");
	textSize(72);
	fill('#A1C181');
	text('Maze Generator', 145, 122);
	text('Seed:'+seed, 100, 400);
	strokeWeight(4);
	stroke('#A1C181');
	fill('#2F2F2F');
	rect(338, 581, 120, 73);
	strokeWeight(1);
	fill('#A1C181');
	text('GO', 342, 645);
}

function drawSettingsMenu(){
	strokeWeight(1);
  	background("#233D4D");
	textSize(72);
	fill('#A1C181');
	text('Maze Generator', 145, 122);
	selectionBox(250, 220, 300, 73, 0);
	selectionBox(250, 370, 300, 73, 1);
	selectionBox(78, 520, 625, 73, 2);
	strokeWeight(1);
	fill('#A1C181');
	text('Rows:'+rows, 262, 282);
	text('Cols:'+cols, 282, 430);
	if(memoryMode)text('Memory Mode:ON', 78, 582);
	else text("Memory Mode:OFF", 78, 582);
}

function drawGame(){
	drawBackground();
	maze.drawMaze();
	player.drawCharacter();
}

function resetGame(){
	maze.reset();
	player.reset();
	seed = makeid(10);
	state = 0;
}

function drawBackground(){
	background("#233D4D");
	stroke("#A1C181");
	strokeWeight(width/100);
	for(i = 0; i <= rows+1; i++){
		line(rowsSpace*i, 0, rowsSpace*i, width);
	};
	for(i = 0; i <= cols+1; i++){
		line(0, colsSpace*i, height, colsSpace*i);
	};
}

function selectionBox(x, y, w, h, s){
	textSize(72);
	strokeWeight(4);
	stroke('#A1C181');
	fill('#233D4D');
	rect(x, y, w, h);
	fill('#2F2F2F');
	if(selected == s)rect(x, y, w, h);
}

function mainMenuControls(){
	if((keyCode === UP_ARROW || key === 'w' || key === 'W') && selected > 0)selected--;
	if((keyCode === DOWN_ARROW || key === 's' || key === 'S') && selected < 1)selected++;
	if(keyCode === ENTER && enterPass){
		if(selected == 0)menuState = 1;
		if(selected == 1)menuState = 2;
		enterPass = false;
	}
}

function playMenuControls(){
	if(isAlphaNumeric(key) && key.length === 1 && seed.length < 10)seed += key
	if(keyCode === BACKSPACE)seed = seed.slice(0, -1);
	if(keyCode === ENTER && enterPass){
		state = 1;
		maze.GenerateMaze();
		enterPass = false; 
	}
}

function settingsControls(){
	if(keyCode === ESCAPE)menuState = 0
	if(keyCode === UP_ARROW || key === 'w' || key === 'W'){
		if(addState){
			if(selected == 0 && rows < 40)rows++;
			if(selected == 1 && cols < 40)cols++;
		}
		else if(selected > 0) selected--;
	}
	if(keyCode === DOWN_ARROW || key === 's' || key === 'S'){
		if(addState){
			if(selected == 0 && rows > 1)rows--;
			if(selected == 1 && cols > 1)cols--;
		}
		else if(selected < 2)selected++;
	}
	if(keyCode == ENTER && enterPass){
		if(selected == 0)addState = !addState;
		if(selected == 1)addState = !addState;
		if(selected == 2)memoryMode = !memoryMode;
	}
}

function playerControls(){
	if(keyCode === LEFT_ARROW || key === 'a' || key === 'A')player.moveLeft();
	if(keyCode === RIGHT_ARROW || key === 'd' || key === 'D')player.moveRight();
	if(keyCode === UP_ARROW || key === 'w' || key === 'W')player.moveUp();
	if(keyCode === DOWN_ARROW || key === 's' || key === 'S')player.moveDown();
}

function isAlphaNumeric(str) {
  var code, i, len;
  for (i = 0, len = str.length; i < len; i++) {
    code = str.charCodeAt(i);
    if (!(code > 47 && code < 58) && // numeric (0-9)
        !(code > 64 && code < 91) && // upper alpha (A-Z)
        !(code > 96 && code < 123)) { // lower alpha (a-z)
      return false;
    }
  }
  return true;
}

function makeid(length) {
    var result           = [];
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
   }
   return result.join('');
}

function isDigit(val) {
  return String(+val).charAt(0) == val;
}
