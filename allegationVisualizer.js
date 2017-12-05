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
  	 return d.person == name.innerText; 
  });
  return filteredData; 
}

function loadVisualization(error, allData) {
  window.dataset = allData; 
  if (error) throw error;
  var names = document.getElementsByClassName('name'); 
  for (var i = 0; i < names.length; i++) {
  	drawTimeline(filter(names[i]), names[i]);
  }
  drawLegend(); 
}

var startOffset = 0; 

// function getStartPoint(rect, d) {
// 	return {
// 		x: rect.x,
// 		y:rect.y
// 	}

// }

function getEndPoint(d) {

}

// function getYOffset(year) {
// 	return year %
// }

function drawTimeline(filterData, name) {
  var firstname = name.innerText.split(" ")[0].toLowerCase();
  var timeline = document.getElementById(firstname);
  var rect = timeline.getBoundingClientRect();
   
   var yOffset = 0;
	let lines = svg.selectAll('line.'+firstname)
	  				 .data(filterData)
	  				 .enter()
	  				 .append("line");
	  let lineAttr =  lines.attr("x1", function(d) {
	  									if (d.type == "Allegation") return rect.x;
	  									else if (d.type == "Achievement")return rect.x + 32;})
						 	.attr("y1", function(d) { return rect.y + ((d.year - 1967) * 10);})
						    .attr("x2",function(d) {
	  									if (d.type == "Allegation") return rect.x + 32;
	  									else if (d.type == "Achievement")return rect.x + 62;})
						    .attr("y2", function(d) {return rect.y + ((d.year - 1967) * 10);})
						    .attr("stroke-width", 2)
						    .attr("stroke", function(d) {
						    			if (d.type == "Allegation") return "red";
						    			else if (d.type == "Achievement") return "green";
						    })
						    .attr('id', function(d) { return d.id})
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
					        });
	
};

function drawLegend() {
	var rect = document.getElementById('legend').getBoundingClientRect();
	let lines = svg.selectAll('line')
					.append('line')
	var x = rect.x;
	var y = rect.y
	var newyear = 1960; 
	var yoffset = 0;
	for (var i = 0; i < 7; i++) {
		svg.append('text')
			.attr("x", x)
          	.attr("y", y + yoffset)
          	.text(newyear)
          	.attr("font-family", "sans-serif")
          	.attr("font-size", "15px")
          	.attr("fill", "white");
        newyear += 10;
		yoffset = (newyear - 1960) * 10; 
	}
}



