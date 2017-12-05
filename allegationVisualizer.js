d3.csv("/data/data.csv", projectData, loadVisualization);

var svg = d3.select('body').append('svg')
.attr('id', 'bodySVG')
.attr('width', 5000)
.attr('height', 5000)

var toolTip = d3.select("body").append("div")	
    .attr("class", "tooltip")	
    .style("opacity", 0);

function projectData(dataPoint) {
  return {
    'industry' : dataPoint.Industry,
    'occupation' : dataPoint.Occupation,
    'person': dataPoint.Person, 
    'year': dataPoint.Year,
    'content': dataPoint.Content,
    'type': dataPoint.Type,
    'id': dataPoint.ID
  }
};

function filter(name) {
  let filteredData = dataset.filter(function(d) {
  	 return d.person == name; 
  }
  return filteredData; 
}

function loadVisualization(error, allData) {
  window.dataset = allData; 
  if (error) throw error;
  var names = document.getElementsByClassName('name'); 
  for (var i = 0; i < names.length; i++) {
  	drawTimeline(filter(name), name);
  }
}

function getStartPoint(d) {

}

function getEndPoint(d) {

}

function drawTimeline(filterData, name) {
  var div = 
  var rect = div.getBoundingClientRect();

  let lines = svg.selectAll('line');
  let updatedLines = lines.data(allData, d => d.id);

  let enterSelection = updatedLines.enter();
  let newLines = enterSelection.append('line') 
  	.attr("x1", rect.x)
 	.attr("y1", rect.y)
    .attr("x2", rect.x + 30)
    .attr("y2", rect.y)
    .attr("stroke-width", 2)
    .attr("stroke", "white")
    .on("mouseover", function(d) {		
            toolTip.transition()		
                .duration(200)		
                .style("opacity", .9);		
            toolTip.html(d.year + "<br/>"  + d.content)	
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 28) + "px");	
            })				
    .on("mouseout", function(d) {		
            toolTip.transition()		
                .duration(500)		
                .style("opacity", 0);	
    });;
};