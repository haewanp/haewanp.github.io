var angle = 0; //initial angle
var trees = [];
var bwTrees = 0;
var hillSpeed;

function setup() {
    createCanvas(480, 320);
    frameRate(10);
    hillSpeed = random(0.0001, 0.0005); 
    
    for (var i = 0; i < 10; i++){ //display 10 trees at the beginning
        var rx = random(width);
        trees[i] = makeTree(rx);
    }
}

function draw() {
    background(202, 244, 235);
    drawHill(); 
    drawTree();
    addTree();
}


function drawHill() {
    beginShape();
    stroke(252, 242, 40);
    for (var x = 0; x < width; x++) {
        
        var y = 90 + sin(angle) * 30; //used sin graph shape
        line(width - x, y, width - x, height);
        angle = angle + PI/121; //increment of angle
    }
    endShape();
    
    stroke(255, 210, 200);
    beginShape(); 
    for (var x = 0; x < width; x++) {
        var t = x * 0.003 + (millis() * hillSpeed);
        var y = map(noise(t), 0, 0.8, 0, height);
        line(x, y, x, height);
    }
    endShape();
    
    beginShape();
    stroke(24, 44, 160);
    for (var x = 0; x < width; x++) {
        var y = 240 + sin(angle) * 30; //used sin graph shape
        line(width - x, y, width - x, height);
        angle = angle + PI/240; //increment of angle
    }
    endShape();
}

function drawTree() {
    for (var i = 0; i < trees.length; i++){
        trees[i].move();
        trees[i].display();
    }
}

function makeTree(x) {
    var tree = {
        birth: x,
        size: random(20, 60),
        speed: -2.0,
        move: TreeMove,
        display: TreeDisplay,
        height: random(30, 60),
        color: [255, 62, 54]
    }
    
    return tree;
}

function TreeMove() {
    this.birth += this.speed;
}

function TreeDisplay() {
    var treeHeight = 50; 
    fill(this.color); 
    noStroke();
    push();
    translate(this.birth, height - this.height);
    ellipse(0, 0, this.size, this.size);
    stroke(255);
    strokeWeight(2);
    line(0, 0, 0, this.height);
    line(0, this.size/5, this.size/6, this.size/20);
    if (this.size > 30) {
        line(0, this.size/3, -this.size/6, this.size/6);
    }
    pop();
}

function addTree() {
    var newTree = 0.85; //percentage
    if (random(0,1) > newTree) {
        bwTrees = bwTrees + 1;
        if (bwTrees == 4) { // it controls distance between. Two trees are not too close to each other
            trees.push(makeTree(width)); //add a tree
            bwTrees = 0; //reset
        }
    }

}




