var NORTH = 0;
var SOUTH = 1;
var EAST= 2;
var WEST = 3;
var WIDTH = 400;
var HEIGHT = 400;

// Constants for main ghost body
var HEAD_RADIUS = 15;
var BODY_WIDTH = HEAD_RADIUS * 2;
var BODY_HEIGHT = 20;
var NUM_FEET = 3;
var FOOT_RADIUS = (BODY_WIDTH) / (NUM_FEET * 2); 

// Constants for eyes
var PUPIL_RADIUS = 2;
var PUPIL_LEFT_OFFSET = 8;
var PUPIL_RIGHT_OFFSET = 20;
var EYE_RADIUS = 4;
var EYE_OFFSET = 5;

var grid = new Grid(10,10);
var ghostArr = [];
var ghostArr2 = [];

var drawGridBol = false;
var pacman;
var direction;
var score = 0;
var scoreTxtNum;
var killingTxtBol;

var pacPosRow = 9;
var pacPosCol = 0;

var pacCenter;
var ghost1Center;
var ghost2Center;

var ghostPosRow = 0;
var ghostPosCol = 5;
var ghost2PosRow = 0;
var ghost2PosCol = 9;

var randomDir = SOUTH;
var randomDir2 = WEST;

var switchCircle;
var killing = false;

var count = 0;
var ghost1KillCounter = 0;
var ghost2KillCounter = 0;



//pacman
var pacCircle;
var pacTriangle;



setSize(WIDTH,HEIGHT + 50);

function start(){
   setBackgroundColor("#030303"); 
   grid.initFromArray([
    [0, 0, 0, 0 ,0, 0, 0, 0, 0, 0],  
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],  
    [0, 0, 0, 0 ,0, 0, 0, 0, 0, 0], 
    [0, 0, 0, 0 ,0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0 ,0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0 ,0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0 ,0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0 ,0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0 ,0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0 ,0, 0, 0, 0, 0, 0],  
]);
   setUp();
   
   makePoint(0,3)
   
   setTimer(moveGhost, 300);
   setTimer(moveGhost2, 300);
   setTimer(addNewSwitch, 5000);
   setTimer(checkCollison, 50);
   
   mouseDownMethod(debug);
   
   keyDownMethod(changeDirection);
   
   
    
}

function drawGrid(){
    if(drawGridBol == true){
        //col
        for(var i = 1; i < 10; i++){
            var line = new Line (WIDTH * i/10, 0, WIDTH * i/10, HEIGHT);
            line.setColor("#1f3ccf")
            add(line);
        }
        for(var i = 1; i < 10; i++){
            var line = new Line (0, HEIGHT * i/10, WIDTH, HEIGHT * i/10);
            line.setColor("#1f3ccf")
            add(line);
        }
    }
}

function setUp(){
    drawGrid();
    // Adds playing area and grid to keep track of playing area
    if (drawGridBol != true){
        //9 row
        drawSquare(200,360);
        grid.set(9,5,1);
        // 8 row
        drawSquare(0,320);
        grid.set(8,0,1);
        drawSquare(40,320);
        grid.set(8,1,1);
        drawSquare(80,320);
        grid.set(8,2,1)
        drawSquare(160,320);
        grid.set(8,4,1);
        drawSquare(200,320);
        grid.set(8,5,1)
        drawSquare(240,320);
        grid.set(8,6,1);
        drawSquare(320,320);
        grid.set(8,8,1);
        // 7th row
        drawSquare(200,280);
        grid.set(7,5,1);
        drawSquare(320,280);
        grid.set(7,8,1);
        // 6th row
        drawSquare(80,240);
        grid.set(6,1,1);
        drawSquare(40,240);
        grid.set(6,2,1);
        drawSquare(120,240);
        grid.set(6,3,1);
        drawSquare(280,240);
        grid.set(6,7,1);
        drawSquare(320,240);
        grid.set(6,8,1);
        // 5th row
        drawSquare(120,200);
        grid.set(5,3,1);
        drawSquare(200,200);
        grid.set(5,5,1);
        //4th row
        drawSquare(0,160);
        grid.set(4,0,1);
        drawSquare(40,160);
        grid.set(4,1,1);
        drawSquare(80,160);
        grid.set(4,2,1);
        drawSquare(120,160);
        grid.set(4,3,1);
        drawSquare(200,160);
        grid.set(4,5,1);
        drawSquare(240,160);
        grid.set(4,6,1);
        drawSquare(320,160);
        grid.set(4,8,1);
        drawSquare(360,160);
        grid.set(4,9,1);
        //3th row
        drawSquare(320,120);
        grid.set(3,8,1);
        drawSquare(240,120);
        grid.set(3,2,1);
        drawSquare(80,120);
        grid.set(3,6,1);
        drawSquare(0,120);
        grid.set(3,0,1);
        //2th row
        drawSquare(0,80);
        grid.set(2,0,1);
        drawSquare(160,80);
        grid.set(2,4,1);
        drawSquare(240,80);
        grid.set(2,6,1);
        //1th row
        drawSquare(0,40);
        grid.set(1,0,1);
        drawSquare(40,40);
        grid.set(1,1,1);
        drawSquare(80,40);
        grid.set(1,2,1);
        drawSquare(120,40);
        grid.set(1,3,1);
        drawSquare(160,40);
        grid.set(1,4,1);
        drawSquare(240,40);
        grid.set(1,6,1);
        drawSquare(280,40);
        grid.set(1,7,1);
        drawSquare(320,40);
        grid.set(1,8,1);
        //0th row
        drawSquare(80,0);
        grid.set(0,2,1);
        grid.set(0,9,0);
        
        
    }
    
    //prints grid
        /*for(var row = 0; row < grid.numRows(); row++){
    		for(var col = 0; col < grid.numCols(); col++){
    		    var elem = grid.get(row, col);
    			print(elem + " ");
    		    }
    		println("");
    	
    		
    	}
    	*/
    	
    	
    generatePointsOnScreen();	
    	
    //makes pacman
    pacman = [];
    pacCircle = new Circle(19);
    pacCircle.setPosition(19, HEIGHT - 19);
    pacCircle.setColor("#e8d907");
    add(pacCircle);
    pacman.push(pacCircle);
    pacTriangle = new Polygon();
    pacTriangle.addPoint(19, HEIGHT - 19);
    pacTriangle.addPoint(40, HEIGHT - 25);
    pacTriangle.addPoint(40, HEIGHT - 13);
    pacTriangle.setColor("#030303");
    add(pacTriangle);
    pacman.push(pacTriangle);
    
    pacCenter = new Circle(1);
    pacCenter.setPosition(20,HEIGHT - 20);
    
    drawGhost1(220,46, "#eb4509");
    drawGhost2(380,46, "#16c916");
    
    scoreStuff();
    
    

}

function scoreStuff(){
    var botLine = new Line(0, HEIGHT, WIDTH, HEIGHT);
    botLine.setColor("#1f3ccf");
    add(botLine);
    
    var scoreTxt = new Text("Score:");
    scoreTxt.setColor("#ffffff");
    scoreTxt.setPosition(10,430);
    add(scoreTxt);
    
    scoreTxtNum = new Text(score);
    scoreTxtNum.setColor("#ffffff");
    scoreTxtNum.setPosition(90,430);
    add(scoreTxtNum);
    
    var killingTxt = new Text("Killing:");
    killingTxt.setColor("#ffffff");
    killingTxt.setPosition(200,430);
    //add(killingTxt);
    
    killingTxtBol = new Text("false");
    killingTxtBol.setColor("#ffffff");
    killingTxtBol.setPosition(280,430);
    //add(killingTxtBol);
    
}

function changeDirection(e){
    
    if(e.keyCode == Keyboard.UP){
       //direction = NORTH; 
       //checks if row is clear
       if (grid.get(pacPosRow - 1, pacPosCol) == 0){
            pacCircle.setPosition(pacCircle.getX(),pacCircle.getY() - 40);
            pacPosRow--;
            
            pacCenter.setPosition(pacCenter.getX(), pacCenter.getY() - 40);
       } 
       //println(pacPosRow + "," + pacPosCol);
       
       if(pacCircle.getY() > 0){
           remove(pacTriangle);
           
           pacTriangle = new Polygon();
           pacTriangle.addPoint(pacCircle.getX(),pacCircle.getY());
           pacTriangle.addPoint(pacCircle.getX() - 6,pacCircle.getY() - 20);
           pacTriangle.addPoint(pacCircle.getX() + 6,pacCircle.getY() - 20);
           add(pacTriangle);
       } else {
            //pacCircle.setPosition(pacCircle.getX(),HEIGHT - 20);
            //pacPosRow = 9;
            
            remove(pacTriangle);
            pacTriangle = new Polygon();
            pacTriangle.addPoint(pacCircle.getX(),pacCircle.getY());
            pacTriangle.addPoint(pacCircle.getX() - 6,pacCircle.getY() - 20);
            pacTriangle.addPoint(pacCircle.getX() + 6,pacCircle.getY() - 20);
            add(pacTriangle);
       }
       
       score++;
    }
    if(e.keyCode == Keyboard.DOWN){
       //direction = SOUTH; 
       if (grid.get(pacPosRow + 1, pacPosCol) == 0){
            pacCircle.setPosition(pacCircle.getX(),pacCircle.getY() + 40);
            pacPosRow++;
            
            pacCenter.setPosition(pacCenter.getX(), pacCenter.getY() + 40);
       }
       //println(pacPosRow + "," + pacPosCol);
       
       if(pacCircle.getY() < HEIGHT){
           remove(pacTriangle);
           pacTriangle = new Polygon();
           pacTriangle.addPoint(pacCircle.getX(),pacCircle.getY());
           pacTriangle.addPoint(pacCircle.getX() - 6,pacCircle.getY() + 20);
           pacTriangle.addPoint(pacCircle.getX() + 6,pacCircle.getY() + 20);
           add(pacTriangle);
       } else {
           
           pacCircle.setPosition(pacCircle.getX(), 20);
           pacPosRow = 0;
           remove(pacTriangle);
           pacTriangle = new Polygon();
           pacTriangle.addPoint(pacCircle.getX(),pacCircle.getY());
           pacTriangle.addPoint(pacCircle.getX() - 6,pacCircle.getY() + 20);
           pacTriangle.addPoint(pacCircle.getX() + 6,pacCircle.getY() + 20);
           add(pacTriangle);
       }
       score++;
    
    }
    if(e.keyCode == Keyboard.RIGHT){
       //direction = EAST; 
       if(grid.get(pacPosRow, pacPosCol + 1) == 0){
            pacCircle.setPosition(pacCircle.getX() + 40,pacCircle.getY());
            pacPosCol++;
            
            pacCenter.setPosition(pacCenter.getX() + 40, pacCenter.getY());
       }
       //println(pacPosRow + "," + pacPosCol);
       
       if(pacCircle.getX() < WIDTH){
           remove(pacTriangle);
           pacTriangle = new Polygon();
           pacTriangle.addPoint(pacCircle.getX(),pacCircle.getY());
           pacTriangle.addPoint(pacCircle.getX() + 20 , pacCircle.getY() - 6);
           pacTriangle.addPoint(pacCircle.getX() + 20 , pacCircle.getY() + 6);
           add(pacTriangle);
       } else {
           pacCircle.setPosition(20,pacCircle.getY());
           pacPosRow = 0;
           remove(pacTriangle);
           pacTriangle = new Polygon();
           pacTriangle.addPoint(pacCircle.getX(),pacCircle.getY());
           pacTriangle.addPoint(pacCircle.getX() + 20 , pacCircle.getY() - 6);
           pacTriangle.addPoint(pacCircle.getX() + 20 , pacCircle.getY() + 6);
           add(pacTriangle);
       }
       score++;
       
    }
    if(e.keyCode == Keyboard.LEFT){
       //direction = WEST; 
       if(grid.get(pacPosRow, pacPosCol - 1) == 0){
            pacCircle.setPosition(pacCircle.getX() - 40,pacCircle.getY());
            pacPosCol--;
            
            pacCenter.setPosition(pacCenter.getX() - 40, pacCenter.getY());
       }
       //println(pacPosRow + "," + pacPosCol);
       
       if( pacCircle.getX() > 0 ){
           remove(pacTriangle);
           pacTriangle = new Polygon();
           pacTriangle.addPoint(pacCircle.getX(),pacCircle.getY());
           pacTriangle.addPoint(pacCircle.getX() - 20 , pacCircle.getY() - 6);
           pacTriangle.addPoint(pacCircle.getX() - 20 , pacCircle.getY() + 6);
           add(pacTriangle);
       } else {
           pacCircle.setPosition(WIDTH - 20,pacCircle.getY());
           pacPosRow = 9;
           remove(pacTriangle);
           pacTriangle = new Polygon();
           pacTriangle.addPoint(pacCircle.getX(),pacCircle.getY());
           pacTriangle.addPoint(pacCircle.getX() - 20 , pacCircle.getY() - 6);
           pacTriangle.addPoint(pacCircle.getX() - 20 , pacCircle.getY() + 6);
           add(pacTriangle);
       }
       score++;
       
       
    }
    
    //println(pacCircle.getX() + " " + pacCircle.getY())
    
    //point Detection
    
    var elem = getElementAt(pacCircle.getX() + 1, pacCircle.getY() - 1);
    if(elem != null && elem.getColor() == "#f1dacc"){
        remove(elem);
        startKilling();
    }
    
    var elem1 = getElementAt(pacCenter.getX(), pacCenter.getY());
    if(elem1 != null && elem1.getColor() == "#f0dacc"){
        remove(elem1);
    }
    
    //ghost Detection
    var ghostRed = getElementAt(pacCircle.getX() + 1, pacCircle.getY() - 1);
    if(ghostRed != null && killing == true && ghostRed.getColor() == "#eb4509"){
        println("Red ghost detected");
    }
    

}

function drawSquare(x,y){
    var square = new Rectangle (WIDTH / 10, HEIGHT / 10);
    square.setColor("#1f3ccf");
    square.setPosition(x,y);
    add(square)
}

function drawGhost1(centerX, centerY, color){
    var rect = new Rectangle(BODY_WIDTH, BODY_HEIGHT);
    rect.setPosition(centerX - 15, centerY - 30);
    rect.setColor(color);
    add(rect);
    ghostArr.push(rect);
	
	var circle = new Circle(FOOT_RADIUS);
	circle.setPosition(centerX - 10, centerY - 10);
	circle.setColor(color);
	add(circle);
	ghostArr.push(circle);
	
	var circle1 = new Circle(FOOT_RADIUS);
	circle1.setPosition(centerX, centerY  -10);
	circle1.setColor(color);
	add(circle1); 
	ghostArr.push(circle1);
	
	var circle2 = new Circle(FOOT_RADIUS);
	circle2.setPosition(centerX + 10, centerY - 10);
	circle2.setColor(color);
	add(circle2);
	ghostArr.push(circle2);
	
	var circle3 = new Circle(HEAD_RADIUS);
	circle3.setPosition(centerX, centerY - 30);
	circle3.setColor(color);
	add(circle3);
	ghostArr.push(circle3);
	
	//eyes
	var circle4 = new Circle(EYE_RADIUS);
	circle4.setPosition(centerX - 7, centerY - 30);
	circle4.setColor(Color.white);
	add(circle4);
	ghostArr.push(circle4);
	
	var circle5 = new Circle(EYE_RADIUS);
	circle5.setPosition(centerX + 7, centerY - 30);
	circle5.setColor(Color.white);
	add(circle5);
	ghostArr.push(circle5);
	
	//pupils
	
	var circle6 = new Circle (PUPIL_RADIUS);
	circle6.setPosition(centerX - 5, centerY - 30);
	circle6.setColor(Color.blue);
	add(circle6);
	ghostArr.push(circle6);
	
	var circle7 = new Circle (PUPIL_RADIUS);
	circle7.setPosition(centerX + 9, centerY - 30);
	circle7.setColor(Color.blue);
	add(circle7);
	ghostArr.push(circle7);
	
	ghost1Center = new Circle(1);
	ghost1Center.setPosition(centerX, centerY - 6);
	ghostArr.push(ghost1Center);
	    
}

function drawGhost2(centerX, centerY, color){
    var rect = new Rectangle(BODY_WIDTH, BODY_HEIGHT);
    rect.setPosition(centerX - 15, centerY - 30);
    rect.setColor(color);
    add(rect);
    ghostArr2.push(rect);
	
	var circle = new Circle(FOOT_RADIUS);
	circle.setPosition(centerX - 10, centerY - 10);
	circle.setColor(color);
	add(circle);
	ghostArr2.push(circle);
	
	var circle1 = new Circle(FOOT_RADIUS);
	circle1.setPosition(centerX, centerY  -10);
	circle1.setColor(color);
	add(circle1); 
	ghostArr2.push(circle1);
	
	var circle2 = new Circle(FOOT_RADIUS);
	circle2.setPosition(centerX + 10, centerY - 10);
	circle2.setColor(color);
	add(circle2);
	ghostArr2.push(circle2);
	
	var circle3 = new Circle(HEAD_RADIUS);
	circle3.setPosition(centerX, centerY - 30);
	circle3.setColor(color);
	add(circle3);
	ghostArr2.push(circle3);
	
	//eyes
	var circle4 = new Circle(EYE_RADIUS);
	circle4.setPosition(centerX - 7, centerY - 30);
	circle4.setColor(Color.white);
	add(circle4);
	ghostArr2.push(circle4);
	
	var circle5 = new Circle(EYE_RADIUS);
	circle5.setPosition(centerX + 7, centerY - 30);
	circle5.setColor(Color.white);
	add(circle5);
	ghostArr2.push(circle5);
	
	//pupils
	
	var circle6 = new Circle (PUPIL_RADIUS);
	circle6.setPosition(centerX - 5, centerY - 30);
	circle6.setColor(Color.blue);
	add(circle6);
	ghostArr2.push(circle6);
	
	var circle7 = new Circle (PUPIL_RADIUS);
	circle7.setPosition(centerX + 9, centerY - 30);
	circle7.setColor(Color.blue);
	add(circle7);
	ghostArr2.push(circle7);
	
	ghost2Center = new Circle(1);
	ghost2Center.setPosition(centerX, centerY - 6);
	ghostArr2.push(ghost2Center);
	    
}

function moveGhost(){
    grid.set(0,9,0);
    //println(ghostPosRow + "," + ghostPosCol);
    
    if (randomDir == NORTH){
        if(ghostPosRow > 0 && ghostPosRow <= 9 && grid.get(ghostPosRow - 1, ghostPosCol) == 0){
            for(var i = 0 ; i < ghostArr.length; i++) {
                ghostArr[i].setPosition(ghostArr[i].getX(), ghostArr[i].getY() - 40);
            } 
            ghostPosRow--;
        } else {
            randomDir = Randomizer.nextInt(NORTH, WEST);
        }
    }
    
    if (randomDir == SOUTH){
        if(ghostPosRow >= 0 && ghostPosRow < 9 && grid.get(ghostPosRow + 1, ghostPosCol) == 0){
            if(ghostPosRow == 2 && ghostPosCol == 9){
                for(var i = 0 ; i < ghostArr.length; i++) {
                    ghostArr[i].setPosition(ghostArr[i].getX() - 40, ghostArr[i].getY());
            }
                ghostPosCol--;
            } else if(ghostPosRow == 6 && ghostPosCol == 6){
                for(var i = 0 ; i < ghostArr.length; i++) {
                    ghostArr[i].setPosition(ghostArr[i].getX() - 40, ghostArr[i].getY());
            }
                ghostPosCol--;
            } else{
                
                for(var i = 0 ; i < ghostArr.length; i++) {
                    ghostArr[i].setPosition(ghostArr[i].getX(), ghostArr[i].getY() + 40);
                } 
                ghostPosRow++;
            }
        }
                    else {
        randomDir = Randomizer.nextInt(NORTH, WEST);
        }
}
    
    if (randomDir == EAST){
        //EAST
        if(ghostPosCol < 9 && ghostPosCol >= 0 && grid.get(ghostPosRow, ghostPosCol + 1) == 0){
            for(var i = 0 ; i < ghostArr.length; i++) {
                ghostArr[i].setPosition(ghostArr[i].getX() + 40, ghostArr[i].getY());
            }
            ghostPosCol++;
        } else {
            randomDir = Randomizer.nextInt(NORTH, WEST);
        }
    }
    
    if (randomDir == WEST){
        if(ghostPosCol > 0 && ghostPosCol <= 9 && grid.get(ghostPosRow, ghostPosCol - 1) == 0){
            for(var i = 0 ; i < ghostArr.length; i++) {
                ghostArr[i].setPosition(ghostArr[i].getX() - 40, ghostArr[i].getY());
            }
            ghostPosCol--;
        } else {
            randomDir = Randomizer.nextInt(NORTH, WEST);
        }
        
    }
}

function moveGhost2(){
    //println(ghostPosRow + "," + ghostPosCol);
    
    if (randomDir2 == NORTH){
        if(ghost2PosRow > 0 && ghost2PosRow <= 9 && grid.get(ghost2PosRow - 1, ghost2PosCol) == 0){
            for(var i = 0 ; i < ghostArr2.length; i++) {
                ghostArr2[i].setPosition(ghostArr2[i].getX(), ghostArr2[i].getY() - 40);
            } 
            ghost2PosRow--;
        } else {
            randomDir2 = Randomizer.nextInt(NORTH, WEST);
        }
    }
    
    if (randomDir2 == SOUTH){
        if(ghost2PosRow >= 0 && ghost2PosRow < 9 && grid.get(ghost2PosRow + 1, ghost2PosCol) == 0){
            if(ghost2PosRow == 2 && ghost2PosCol == 9){
                for(var i = 0 ; i < ghostArr2.length; i++) {
                    ghostArr2[i].setPosition(ghostArr2[i].getX() - 40, ghostArr2[i].getY());
            }
                ghost2PosCol--;
            } else if(ghostPosRow == 6 && ghostPosCol == 6){
                for(var i = 0 ; i < ghostArr.length; i++) {
                    ghostArr[i].setPosition(ghostArr[i].getX() - 40, ghostArr[i].getY());
            }
                ghostPosCol--;
            }  else{
                
                for(var i = 0 ; i < ghostArr2.length; i++) {
                    ghostArr2[i].setPosition(ghostArr2[i].getX(), ghostArr2[i].getY() + 40);
                } 
                ghost2PosRow++;
            }
        }
                    else {
        randomDir2 = Randomizer.nextInt(NORTH, WEST);
        }
}
    
    if (randomDir2 == EAST){
        //EAST
        if(ghost2PosCol < 9 && ghost2PosCol >= 0 && grid.get(ghost2PosRow, ghost2PosCol + 1) == 0){
            for(var i = 0 ; i < ghostArr2.length; i++) {
                ghostArr2[i].setPosition(ghostArr2[i].getX() + 40, ghostArr2[i].getY());
            }
            ghost2PosCol++;
        } else {
            randomDir2 = Randomizer.nextInt(NORTH, WEST);
        }
    }
    
    if (randomDir2 == WEST){
        if(ghost2PosCol > 0 && ghost2PosCol <= 9 && grid.get(ghost2PosRow, ghost2PosCol - 1) == 0){
            for(var i = 0 ; i < ghostArr2.length; i++) {
                ghostArr2[i].setPosition(ghostArr2[i].getX() - 40, ghostArr2[i].getY());
            }
            ghost2PosCol--;
        } else {
            randomDir2 = Randomizer.nextInt(NORTH, WEST);
        }
        
    }
}

function makePoint(row,col){
    var circle = new Circle(2.5);
    circle.setColor("#f0dacc");
    if(row == 0){
        if(col == 0){
            circle.setPosition(20,20);
        }
        if(col == 1){
            circle.setPosition(60,20);
        }
        if(col == 2){
            circle.setPosition(100,20);
        }
        if(col == 3){
            circle.setPosition(140,20);
        }
        if(col == 4){
            circle.setPosition(180,20);
        }
        if(col == 5){
            circle.setPosition(220,20);
        }
        if(col == 6){
            circle.setPosition(260,20);
        }
        if(col == 7){
            circle.setPosition(300,20);
        }
        if(col == 8){
            circle.setPosition(340,20);
        }
        if(col == 9){
            circle.setPosition(380,20);
        }
    }
    if(row == 1){
        if(col == 0){
            circle.setPosition(20,60);
        }
        if(col == 1){
            circle.setPosition(60,60);
        }
        if(col == 2){
            circle.setPosition(100,60);
        }
        if(col == 3){
            circle.setPosition(140,60);
        }
        if(col == 4){
            circle.setPosition(180,60);
        }
        if(col == 5){
            circle.setPosition(220,60);
        }
        if(col == 6){
            circle.setPosition(260,60);
        }
        if(col == 7){
            circle.setPosition(300.60);
        }
        if(col == 8){
            circle.setPosition(340,60);
        }
        if(col == 9){
            circle.setPosition(380,60);
        }
    }
    if(row == 2){
        if(col == 0){
            circle.setPosition(20,100);
        }
        if(col == 1){
            circle.setPosition(60,100);
        }
        if(col == 2){
            circle.setPosition(100,100);
        }
        if(col == 3){
            circle.setPosition(140,100);
        }
        if(col == 4){
            circle.setPosition(180,100);
        }
        if(col == 5){
            circle.setPosition(220,100);
        }
        if(col == 6){
            circle.setPosition(260,100);
        }
        if(col == 7){
            circle.setPosition(300,100);
        }
        if(col == 8){
            circle.setPosition(340,100);
        }
        if(col == 9){
            circle.setPosition(380,100);
        }
    }
    if(row == 3){
        if(col == 0){
            circle.setPosition(20,140);
        }
        if(col == 1){
            circle.setPosition(60,140);
        }
        if(col == 2){
            circle.setPosition(100,140);
        }
        if(col == 3){
            circle.setPosition(140,140);
        }
        if(col == 4){
            circle.setPosition(180,140);
        }
        if(col == 5){
            circle.setPosition(220,140);
        }
        if(col == 6){
            circle.setPosition(260,140);
        }
        if(col == 7){
            circle.setPosition(300,140);
        }
        if(col == 8){
            circle.setPosition(340,140);
        }
        if(col == 9){
            circle.setPosition(380,140);
        }
    }
    if(row == 4){
        if(col == 0){
            circle.setPosition(20,180);
        }
        if(col == 1){
            circle.setPosition(60,180);
        }
        if(col == 2){
            circle.setPosition(100,180);
        }
        if(col == 3){
            circle.setPosition(140,180);
        }
        if(col == 4){
            circle.setPosition(180,180);
        }
        if(col == 5){
            circle.setPosition(220,180);
        }
        if(col == 6){
            circle.setPosition(260,180);
        }
        if(col == 7){
            circle.setPosition(300,180);
        }
        if(col == 8){
            circle.setPosition(340,180);
        }
        if(col == 9){
            circle.setPosition(380,180);
        }
    }
    if(row == 5){
        if(col == 0){
            circle.setPosition(20,220);
        }
        if(col == 1){
            circle.setPosition(60,220);
        }
        if(col == 2){
            circle.setPosition(100,220);
        }
        if(col == 3){
            circle.setPosition(140,220);
        }
        if(col == 4){
            circle.setPosition(180,220);
        }
        if(col == 5){
            circle.setPosition(220,220);
        }
        if(col == 6){
            circle.setPosition(260,220);
        }
        if(col == 7){
            circle.setPosition(300,220);
        }
        if(col == 8){
            circle.setPosition(340,220);
        }
        if(col == 9){
            circle.setPosition(380,220);
        }
    }
    if(row == 6){
        if(col == 0){
            circle.setPosition(20,260);
        }
        if(col == 1){
            circle.setPosition(60,260);
        }
        if(col == 2){
            circle.setPosition(100,260);
        }
        if(col == 3){
            circle.setPosition(140,260);
        }
        if(col == 4){
            circle.setPosition(180,260);
        }
        if(col == 5){
            circle.setPosition(220,260);
        }
        if(col == 6){
            circle.setPosition(260,260);
        }
        if(col == 7){
            circle.setPosition(300,260);
        }
        if(col == 8){
            circle.setPosition(340,260);
        }
        if(col == 9){
            circle.setPosition(380,260);
        }
    }
    if(row == 7){
        if(col == 0){
            circle.setPosition(20,300);
        }
        if(col == 1){
            circle.setPosition(60,300);
        }
        if(col == 2){
            circle.setPosition(100,300);
        }
        if(col == 3){
            circle.setPosition(140,300);
        }
        if(col == 4){
            circle.setPosition(180,300);
        }
        if(col == 5){
            circle.setPosition(220,300);
        }
        if(col == 6){
            circle.setPosition(260,300);
        }
        if(col == 7){
            circle.setPosition(300,300);
        }
        if(col == 8){
            circle.setPosition(340,300);
        }
        if(col == 9){
            circle.setPosition(380,300);
        }
    }
    if(row == 8){
        if(col == 0){
            circle.setPosition(20,340);
        }
        if(col == 1){
            circle.setPosition(60,340);
        }
        if(col == 2){
            circle.setPosition(100,340);
        }
        if(col == 3){
            circle.setPosition(140,340);
        }
        if(col == 4){
            circle.setPosition(180,340);
        }
        if(col == 5){
            circle.setPosition(220,340);
        }
        if(col == 6){
            circle.setPosition(260,340);
        }
        if(col == 7){
            circle.setPosition(300,340);
        }
        if(col == 8){
            circle.setPosition(340,340);
        }
        if(col == 9){
            circle.setPosition(380,340);
        }
    }
    if(row == 9){
        if(col == 0){
            circle.setPosition(20,380);
        }
        if(col == 1){
            circle.setPosition(60,380);
        }
        if(col == 2){
            circle.setPosition(100,380);
        }
        if(col == 3){
            circle.setPosition(140,380);
        }
        if(col == 4){
            circle.setPosition(180,380);
        }
        if(col == 5){
            circle.setPosition(220,380);
        }
        if(col == 6){
            circle.setPosition(260,380);
        }
        if(col == 7){
            circle.setPosition(300,380);
        }
        if(col == 8){
            circle.setPosition(340,380);
        }
        if(col == 9){
            circle.setPosition(380,380);
        }
    }
    
    
    add(circle);
}

function generatePointsOnScreen(){
    makePoint(0,0);
    makePoint(0,1);
    makePoint(0,3);
    makePoint(0,4);
    makePoint(0,5);
    makePoint(0,6);
    makePoint(0,7);
    makePoint(0,8);
    makePoint(0,9);
    
    makePoint(1,5);
    makePoint(1,9);
    
    makePoint(2,1);
    makePoint(2,2);
    makePoint(2,3);
    makePoint(2,5);
    makePoint(2,7);
    makePoint(2,8);
    makePoint(2,9);
    
    makePoint(3,1);
    makePoint(3,3);
    makePoint(3,4);
    makePoint(3,5);
    makePoint(3,7);
    makePoint(3,9);
    
    makePoint(4,4);
    makePoint(4,7);
    
    makePoint(5,0);
    makePoint(5,1);
    makePoint(5,2);
    makePoint(5,4);
    makePoint(5,6);
    makePoint(5,7);
    makePoint(5,8);
    makePoint(5,9);
    
    makePoint(6,0);
    makePoint(6,4);
    makePoint(6,5);
    makePoint(6,6);
    makePoint(6,9);
    
    makePoint(7,0);
    makePoint(7,1);
    makePoint(7,2);
    makePoint(7,3);
    makePoint(7,4);
    makePoint(7,6);
    makePoint(7,7);
    makePoint(7,9);
    
    makePoint(8,3);
    makePoint(8,7);
    makePoint(8,9);
    
    makePoint(9,0);
    makePoint(9,1);
    makePoint(9,2);
    makePoint(9,3);
    makePoint(9,4);
    makePoint(9,6);
    makePoint(9,7);
    makePoint(9,8);
    makePoint(9,9);
    
}

function addNewSwitch(){
    remove(switchCircle);
    var randomSpotSwitch = Randomizer.nextInt(1, 5);
    var switchCircle = new Circle(10)
    switchCircle.setColor("#f1dacc");
    if (randomSpotSwitch == 1){
        switchCircle.setPosition(220,260);
    } else if(randomSpotSwitch == 2){
        switchCircle.setPosition(60,140);
    } else if(randomSpotSwitch == 3){
        switchCircle.setPosition(140,20);
    } else if(randomSpotSwitch == 4){
        switchCircle.setPosition(380,140);
    } else if(randomSpotSwitch == 5){
        switchCircle.setPosition(380,300);
    }
    add(switchCircle);
    
}

function startKilling(){
    killing = true;
    killingTxtBol.setText("True");
    
    for(var i = 0; i < ghostArr.length; i++){
        ghostArr[i].setColor(Color.blue);
    }
    ghostArr[5].setColor(Color.white);
    ghostArr[6].setColor(Color.white);
    
    for(var i = 0; i < ghostArr2.length; i++){
        ghostArr2[i].setColor(Color.blue);
    }
    ghostArr2[5].setColor(Color.white);
    ghostArr2[6].setColor(Color.white);
    
    setTimer(killCounter, 50);

}

function killCounter(){
    count++;
    if (count > 100){
        stopTimer(killCounter);
        killing = false;
        count = 0;
        
        for(var i = 0; i < ghostArr.length; i++){
            ghostArr[i].setColor("#eb4509");
        }
        ghostArr[5].setColor(Color.white);
        ghostArr[6].setColor(Color.white);
        ghostArr[7].setColor(Color.blue);
        ghostArr[8].setColor(Color.blue);
    
        for(var i = 0; i < ghostArr2.length; i++){
            ghostArr2[i].setColor("#16c916");
        }
        ghostArr2[5].setColor(Color.white);
        ghostArr2[6].setColor(Color.white);
        ghostArr2[7].setColor(Color.blue);
        ghostArr2[8].setColor(Color.blue);
   
    }
}

function checkCollison(){
    var ghost1X = ghost1Center.getX();
    var ghost1Y = ghost1Center.getY();
    
    var ghost2X = ghost2Center.getX();
    var ghost2Y = ghost2Center.getY();
    
    var pacX = pacCenter.getX();
    var pacY = pacCenter.getY() + 20;
    
    if (killing == false){
        if(ghost1X == pacX && ghost1Y == pacY){
            endGame();
        } else if(ghost2X == pacX && ghost2Y == pacY){
            endGame();
        }
    } else if (killing == true){
        if(pacX == ghost1X && pacY == ghost1Y){
            ghost1Kill();
        } else if (pacX == ghost2X && pacY == ghost2Y){
            ghost2Kill();
        }
    }
    
    // score Update
    scoreTxtNum.setText(score);
}

function ghost1Kill(){
    score = score + 100;
    stopTimer(moveGhost);
    for(var i = 0; i < ghostArr.length; i++){
            ghostArr[i].setColor(Color.black);
        }
    ghostArr[5].setColor(Color.white);
    ghostArr[6].setColor(Color.white);
    ghostArr[7].setColor(Color.black);
    ghostArr[8].setColor(Color.black);
    
    setTimer(ghost1KillDelay, 50);
}

function ghost1KillDelay(){
    ghost1KillCounter++;
    
    if(ghost1KillCounter > 200){
        stopTimer(ghost1KillDelay)
        setTimer(moveGhost, 300);
        ghost1KillCounter = 0;
        
        for(var i = 0; i < ghostArr.length; i++){
            ghostArr[i].setColor("#eb4509");
        }
        ghostArr[5].setColor(Color.white);
        ghostArr[6].setColor(Color.white);
        ghostArr[7].setColor(Color.blue);
        ghostArr[8].setColor(Color.blue);
    }
}

function ghost2Kill(){
    score = score + 100;
    stopTimer(moveGhost2);
    for(var i = 0; i < ghostArr2.length; i++){
            ghostArr2[i].setColor(Color.black);
        }
    ghostArr2[5].setColor(Color.white);
    ghostArr2[6].setColor(Color.white);
    ghostArr2[7].setColor(Color.black);
    ghostArr2[8].setColor(Color.black);
    
    setTimer(ghost2KillDelay, 50);
}

function ghost2KillDelay(){
    ghost2KillCounter++;
    
    if(ghost2KillCounter > 200){
        stopTimer(ghost2KillDelay)
        setTimer(moveGhost2, 300);
        ghost2KillCounter = 0;
        
        for(var i = 0; i < ghostArr2.length; i++){
            ghostArr2[i].setColor("#eb4509");
        }
        ghostArr2[5].setColor(Color.white);
        ghostArr2[6].setColor(Color.white);
        ghostArr2[7].setColor(Color.blue);
        ghostArr2[8].setColor(Color.blue);
    }
}



function endGame(){
    stopTimer(moveGhost);
    stopTimer(moveGhost2);
    stopTimer(addNewSwitch);
    stopTimer(checkCollison);
    
    var endTxt = new Text(" DIED");
    endTxt.setPosition(WIDTH / 2, HEIGHT /2);
    endTxt.setColor(Color.red);
    add(endTxt);
}

function debug(){
    var ghost1X = ghost1Center.getX();
    var ghost1Y = ghost1Center.getY();
    
    var ghost2X = ghost2Center.getX();
    var ghost2Y = ghost2Center.getY();
    
    var pacX = pacCenter.getX();
    var pacY = pacCenter.getY();
    
    println("Ghost1 cord: " + ghost1X + " " + ghost1Y);
    println("______________________");
    println("Ghost2 cord: " + ghost2X + " " + ghost2Y);
    println("______________________");
    println("Pac cord: " + pacX + " " + pacY);
    println("______________________");
    
    //ghost 2 y cord is 20 higher than pac y
    //same wth red ghost
}
