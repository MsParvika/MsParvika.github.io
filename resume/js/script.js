$('img').each(function() {
        var $img = $(this);
        var imgURL = $img.attr('src');

        $.get(imgURL, function(data) {
          // Get the SVG tag, ignore the rest
          var $svg = $(data).find('svg');
          // Replace image with new SVG
          $img.replaceWith($svg);
        });
      });

var timeline = $("#timeline")
	divWidth = timeline.width()
	divHeight = timeline.height()

var detail = $("#detail");
	detailWidth = detail.width()
	detailHeight = detail.height()

var selected = 9;

var margin = {top: 25, right: 50, bottom: 10, left: 100};
    width = divWidth - margin.left - margin.right,
    height = divHeight - margin.top - margin.bottom;

var svg = d3.select("#timeline").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var desGroup = d3.select("#detail").append("svg")
	.attr("width",detailWidth)
	.attr("height",detailHeight)
	.attr("opacity",1)

var desDiv = desGroup.append("foreignObject")
	.attr("x",0)
	.attr("y",0)
	.attr("width",detailWidth)
	.attr("height",detailHeight)
  .append("xhtml:div")

var parseDate = d3.time.format("%d-%b-%y").parse;

var x = d3.time.scale()
    .range([0, width]);

var padding = 12;

var y = d3.scale.ordinal()
	.domain(["school","intern","intern2","workex", "workex2", "workex3", "ExtraCurricular1","ExtraCurricular2", "ExtraCurricular3"])
	.range([height/6,
		height/2 - 2.5*padding,
		height/2 -1.5*padding,
		height/2,
		height/2+1*padding,
		height/2+2.5*padding,
		height - height/6 - 0.5*padding ,
		height - height/6 + 1.5*padding,
		height - height/6]);

var axisPoints = [
	{year:"2011", date:"1-Jan-11"},
	{year:"12", date:"1-Jan-12"},
	{year:"13", date:"1-Jan-13"},
	{year:"14", date:"1-Jan-14"},
	{year:"15", date:"1-Jan-15"},
	{year:"16", date:"1-Jan-16"},
	{year:"17", date:"1-Jan-17"},
	{year:"18", date:"1-Jan-18"},
	{year:"19", date:"1-Jan-19"},
	{year:"20", date:"1-Jan-20"},
]

var textPadding = 5,
	linePadding = 25;

svg.append("line")
	.attr("x1",-margin.left)
	.attr("x2",width)
	.attr("y1",height/3)
	.attr("y2",height/3)
	.attr("stroke", "#B3B3B3")
	.attr("stroke-width", 1)

svg.append("line")
	.attr("x1",-margin.left)
	.attr("x2",width)
	.attr("y1",height - height/3)
	.attr("y2",height - height/3)
	.attr("stroke", "#B3B3B3")
	.attr("stroke-width", 1) 
	

svg.append("text")
	.attr("class","categoryLabels")
	.text("School")
	.attr("x",-margin.left)
	.attr("y", height/6+textPadding)

svg.append("text")
	.attr("class","categoryLabels")
	.text("Work")
	.attr("x",-margin.left)
	.attr("y", height/2+textPadding)

svg.append("text")
	.attr("class","categoryLabels")
	.text("Extra Curricular")
	.attr("x",-margin.left)
	.attr("y", height-height/6+textPadding)


d3.csv("data/resume_data.csv", function(error, data){

	data.forEach(function(d){
		d.beg = parseDate(d.beg)
		d.end = parseDate(d.end)
	})

	x.domain([
		d3.min(data, function(d) { return d.beg; }),
		d3.max(data, function(d) { return d.end; })
	])

	svg.selectAll(".axis")
		.data(axisPoints)
	    .enter().append("line")
	  	.attr("x1", function(d) { return x(parseDate(d.date)); })
		.attr("x2", function(d) { return x(parseDate(d.date)); })
		.attr("y1", -10)
		.attr("y2", height+10)
		.attr("stroke", "#E6E6E6")
		.attr("stroke-width", 1)

	svg.selectAll(".axisLabels")
		.data(axisPoints)
	  .enter().append("text")
	  	.attr("class","axisLabels")
	  	.attr("x", function(d) { return x(parseDate(d.date)); })
	  	.attr("y", function(d, i) { return -15; })
	  	.attr("text-anchor","middle")
	  	.text(function(d) { return d.year; })

	svg.append("text")
		.attr("class","axisLabels")
		.text("Intern")
		.attr("x", x(parseDate("15-Jul-14")))
		.attr("y", y("intern") - 3)

	svg.append("text")
		.attr("class","axisLabels")
		.text("UNDERGRAD")
		.attr("x", x(parseDate("01-Jul-11")))
		.attr("y", y("school") - 3)

	svg.append("text")
		.attr("class","axisLabels")
		.text("POST GRAD")
		.attr("x", x(parseDate("07-Aug-18")))
		.attr("y", y("school") - 3)

	svg.append("text")
		.attr("class","axisLabels")
		.text("Intern")
		.attr("x", x(parseDate("01-Jan-15")))
		.attr("y", y("intern2") - 3)

	svg.append("text")
		.attr("class","axisLabels")
		.text("Work Ex")
		.attr("x", x(parseDate("08-Jul-15")))
		.attr("y", y("workex") - 3)

	svg.append("text")
		.attr("class","axisLabels")
		.text("Work Ex")
		.attr("x", x(parseDate("20-Oct-18")))
		.attr("y", y("workex2") - 3)
		
	svg.append("text")
		.attr("class","axisLabels")
		.text("Work Ex")
		.attr("x", x(parseDate("20-May-19")))
		.attr("y", y("workex3") - 3)

	svg.append("text")
		.attr("class","axisLabels")
		.text("Event Head")
		.attr("x", x(parseDate("15-Jan-17")))
		.attr("y", y("ExtraCurricular3") - 3)
	
	svg.append("text")
		.attr("class","axisLabels")
		.text("HackOn")
		.attr("x", x(parseDate("05-Mar-14")))
		.attr("y", y("ExtraCurricular1") - 3)
		
	svg.append("text")
		.attr("class","axisLabels")
		.text("NGO")
		.attr("x", x(parseDate("15-Nov-15")))
		.attr("y", y("ExtraCurricular2") - 3)


	var lines = svg.selectAll(".rect")
		.data(data)
		.enter().append("rect")
	  	.attr("class","rect")
	    .attr("x", function(d) { return x(d.beg); })
	    .attr("width", function(d) { return x(d.end)-x(d.beg); })
	    .attr("y", function(d) { return y(d.cat); })
	    .attr("height", 7 )
	    .attr("fill", function(d, i) {
	    	if (i==selected) {
	    		return "#000000"
	    	}
	    	else {
	    		return "#B3B3B3"
	    	}
		})
	    .attr("stroke", "white")
	    .on("click", function(d, i) {
	    	selected = i;
	    	update();
	    })

	svg.append("text")

	var des = desDiv.selectAll(".div")
		.data(data)
	  .enter().append("div")
	  	.html(function(d) { return d.des; })
	  	.attr("class", function(d, i) {
	  		if (i == selected) {
	  			return "shown"
	  		}
	  		else {
	  			return "hidden"
	  		}
	  	})

	var update = function() {
		lines.transition()
			.duration(400)
			.attr("fill",function(d,i){
				if (i === selected){
					return "#000000"
				}
				else{
					return "#B3B3B3"
				}
			});

		desGroup.transition()
			.duration(200)
			.attr("opacity",0)

		des.transition()
			.delay(200)
			.attr("class",function(d, i) {
				if (i==selected) {
					return "shown"
				}
				else {
					return "hidden"
				}
		});

		desGroup.transition()
			.delay(200)
			.duration(200)
			.attr("opacity",1);
	}
})