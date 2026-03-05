//create the konva stage
const stage = new Konva.Stage({
  container: "konva-stage",
  width: 500,
  height: 500,
  fill: "red",
});

//create a layer
const firstLayer = new Konva.Layer();

//create our shape
const circle = new Konva.Circle({
  x: 250,
  y: 250,
  radius: 100,
  fill: "red",
  stroke: "yellow",
  strokeWidth: 7,
});

//add the shape to the layer
firstLayer.add(circle);

//add the layer to the stage
stage.add(firstLayer);
