function setup() {
	createCanvas(800, 800);
	state = 0;
	menuState = 0;
	rows = 20;
	cols = 20;
	rowsSpace  = (height/rows);
	colsSpace = (width/cols);
	lineSpace = (width/200);
	maze = new Maze()
	player = new Player();
	seed = makeid(10);
	selected = 0;
	memoryMode = true; 
	addState = false;
	enterPass = true;
}

function draw() {
	if(state == 0)drawMenu();
	if(state == 1)drawGame();
	if(state == 2)drawWinScreen();
	if(state == 3)resetGame();
}

function keyPressed(){
	if(state == 0){
		if(menuState == 0)mainMenuControls();
		if(menuState == 1)playMenuControls();
		if(menuState == 2)settingsControls();
	}
	if(state == 1)playerControls();
	if(state == 2)winScreenControls();
	enterPass = true;
}

