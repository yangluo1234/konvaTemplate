// find our elements
const stageContainer = document.getElementById("stage-container");
const circleButton = document.getElementById("circle-button");
const timeInput = document.getElementById("time-input");
const clearButton = document.getElementById("clear-button");

// Get the width and height of the stage container.
let stageContainerWidth = stageContainer.offsetWidth;
let stageContainerHeight = stageContainer.offsetHeight;
//console.log("Stage container width:", stageContainerWidth);
//console.log("Stage container height:", stageContainerHeight);

//find the background  colour of the stage container.
let bgColour = getComputedStyle(stageContainer).backgroundColor;
//console.log("Background colour of stage container:", bgColour);

//set default circle colour
let circleColour = "red";

// create the konva stage
const stage = new Konva.Stage({
  container: "konva-stage",
  width: stageContainerWidth,
  height: stageContainerHeight,
});

const firstLayer = new Konva.Layer();

//add the first layer to the stage
stage.add(firstLayer);

// add interaction to the circle button
function drawNewCircle() {
  const circle = new Konva.Circle({
    x: stage.width() * Math.random(),
    y: stage.height() * Math.random(),
    radius: 50 * Math.random(),
    fill: circleColour,
  });
  firstLayer.add(circle);
}

circleButton.addEventListener("click", drawNewCircle);

//I want to add interaction to the time input with colour change based on the day and night time.
//I will use the value of the time input to determine whether it is day or night time,
//and then change the background colour of the stage, as well as the colour of the circles.
//When the time is between 6am to 18pm,
//the background colour will be white and the circle colour will be red like day and sun.
//When the time is between 18pm to 6am,
// the background colour will be black and the circle colour will be yellow like night and moon.
//I chose this interaction design because it is simple and makes use of the time input to create a clear mapping
//between the time of day and the visual elements on the stage, which can enhance the user experience.

//add interaction to the time input with colour change based on the day and night time
timeInput.addEventListener("input", function () {
  const timeValue = parseInt(timeInput.value);
  if (timeValue >= 6 && timeValue < 18) {
    // Daytime (6:00 AM to 18:00 PM)
    bgColour = "white";
    circleColour = "red";
  } else {
    // Nighttime (18:00 PM to 6:00 AM)
    bgColour = "black";
    circleColour = "yellow";
  }
  stageContainer.style.backgroundColor = bgColour;
});

//add button to clear the stage
function clearStage() {
  //Remove all circles from the stage by destroying the fist layer.
  //Reference from Konva documentation: https://konvajs.org/api/Konva.Layer.html#destroyChildren
  firstLayer.destroyChildren();
}

clearButton.addEventListener("click", clearStage);

//drawing feature
//feature analysis
//what is the usergoal? trying to draw a picture.
//what is the represented model? cursor on the canvas; define canvas; brush select;
//colour? or woould that be its own system?
//how does it behave?
//move our cursor onto canvas, press mouse button down, move mouse, release mouse.

//what is the implemented model? create a new line when mouse button down, add to that lne when mouse move.
//how does it interact with other feature?
//colour, images for the brush, eraser, uploaded image

//keep track of when button is held
let isDrawing = false;
let lastLine;

//user presses mouse button
function drawMouseDown() {
  isDrawing = true;
  const pos = stage.getPointerPosition();

  lastLine = new Konva.Line({
    stroke: "red",
    strokeWidth: 5,
    lineCap: "round",
    lineJoin: "round",
    points: [pos.x, pos.y, pos.x, pos.y],
  });
  firstLayer.add(lastLine);
}
//add function to mousedown event
stage.on("mousedown", drawMouseDown);

//user moves their mouse
function drawMouseMove() {
  //dont run if not drawing
  if (isDrawing === false) {
    return;
  }
  // if isDrawing is true
  const pos = stage.getPointerPosition();
  let newPoints = lastLine.points().concat([pos.x, pos.y]);
  lastLine.points(newPoints);
}

//add function to mousemove event
stage.on("mousemove", drawMouseMove);

//user releases mouse button
function drawMouseUp() {
  isDrawing = false;
}

//add function to mouseup event
//stage.on("mouseup", drawMouseUp);

window.addEventListener("mouseup", drawMouseUp);
