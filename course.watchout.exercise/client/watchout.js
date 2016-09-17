var w = window.innerWidth;
var h = window.innerHeight;
var circles = [];
var high = 0, current = 0, collisions = 0;
var color = d3.scale.category20();

var timer = function(){
  currentScore.text("Current Score: "+ current++)
}

var randPosValue = function(){
  var randX = Math.random() * w
  var randY = Math.random() * h
  var color = d3.scale.category10()
  return [randX,randY,color]
}

var changePos = function () {
  circles.forEach(function (circle) {
    circle.transition().duration(1500).attr("x",randPosValue()[0]).attr("y",randPosValue()[1])
  })
}

var svgContainer = d3.select(".board").append("svg:svg")
  .attr("width", w)
  .attr("height", h)

var gameBoard = svgContainer.append("rect")
  .attr("width", w)
  .attr("height", h)
  .attr("cx", 50)
  .attr("cy", 50)
  .attr("fill", 'white')

var highScore = svgContainer.append("text")
  .attr("x",10)
  .attr("y",200)
  .attr('fill',"black")
  .style("font-size", "170px")
  .style("font-family", "helvetica")
  .style("opacity", "0.05")
  .text("High Scores: " + high)

var currentScore = svgContainer.append("text")
  .attr("x",10)
  .attr("y",400)
  .attr('fill',"black")
  .attr("dy","70px")
  .style("font-size", "170px")
  .style("font-family", "helvetica")
  .style("opacity", "0.05")
  .text("Current Score: " + current)

var collisionScore = svgContainer.append("text")
  .attr("x",10)
  .attr("y",750)
  .attr('fill',"black")
  .style("font-size", "170px")
  .style("font-family", "helvetica")
  .style("opacity", "0.05")
  .text("Collisions: " + collisions)

for (var i = 0; i < 15; i++) {
  var randX = Math.random() * w
  var randY = Math.random() * h
  circles[i] = svgContainer.append("image")
  .attr("x", randX)
  .attr("y", randY)
  .attr("xlink:href","https://media.giphy.com/media/l0HlBo3lSZ1cWYxag/giphy.gif")
  .attr("width", 150)
  .attr("height",150)
  .on("mouseover",function () {
    collisions++
    collisionScore.text("Collisions: " + collisions);
    if(high < current){
      high = current
      highScore.text("High Score: " + high);
    }
    current = 0
  });

}

setInterval(changePos,1000)
setInterval(timer,1000)
setInterval(randPosValue,0)
