

// set the dimensions and margins of the graph
var margin = {top: 10, right: 10, bottom: 10, left: 10};
var width = 1600 - margin.left - margin.right;
var height = 10200 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Color scale used
var color = d3.scaleOrdinal(d3.schemeCategory10);

// Set the sankey diagram properties
var sankey = d3.sankey()
    .nodeWidth(20)
    .nodePadding(20)
    .size([width, height]);
	
	
// load the data
var skipEngredient ={
	Energy : true,
	Time : true
}
var skipManufactory ={
	FabricatorRecipes : true,
	OrganicsPrinterRecipes : true,
	IngotRecipes: true,
	CentrifugeRecipes : true
}
var Ore={
	Lead : true,
	Copper : true,
	Silver : true,
	Gold : true,
	Iron : true,
	Nickel : true,
	Silicon : true
}
var nodeIds = {};
var ingredients = new Set();

function convertIngredients2(data){
	var ingredients = {};
	for (const [key, value] of Object.entries(data.ingredients)) {
		if(!skipEngredient[key]){
			switch(data.manufactory){
				case "FurnaceRecipes":
				case "AdvancedFurnaceRecipes":
				case "ArcFurnaceRecipes":
				case "IngotRecipes":
					ingredients["Item"+key+"Ore"]=value;
				break;
				case "CentrifugeRecipes":
					ingredients["Item"+key+"Mix"]=value;
				break;
				case "AutomatedOvenRecipes":
					ingredients["Item"+key+"Cooked"]=value;
				break;
				case "GasCanisterRecipes":
				case "AutolatheRecipes":
				case "FabricatorRecipes":
				case "ElectronicsPrinterRecipes":
				case "ToolManufactoryRecipes":
				case "HydraulicPipeBenderRecipes":
				case "SecurityPrinterRecipes":
					ingredients["Item"+key+"Ingot"]=value;
				break;
				case "PackagingMachineRecipes":
				case "OrganicsPrinterRecipes":
				case "ChemistryRecipes":
				case "MicrowaveRecipes":
				case "PaintMixRecipes":
					ingredients[key]=value;
				break;
				default:
					ingredients[key]=value;
				break;
			}
		}
	}
	return ingredients;
}
function convertIngredients(data){
	var ingredients = {};
	for (const [key, value] of Object.entries(data.ingredients)) {
		if(!skipEngredient[key]){
			ingredients[key]=value;
		}
	}
	return ingredients;
}

function buildLink(data){
	var links = [];
	for (const [key, value] of Object.entries(convertIngredients(data))) {
		links.push({source:nodeIds[key],target:nodeIds[data.item], sourceName:key,targetName:data.item,value:value});
	}
	return links;
};

// Nodes
var nodeNames = new Set();
var nodes = [];
for(const recipe of data.recipes){
	if(!skipManufactory[recipe.manufactory]){
		for (const [key, value] of Object.entries(convertIngredients(recipe))) {
			ingredients.add(key);
		}
		nodeNames.add(recipe.item);
	}
}
for (const value of ingredients){
	nodeNames.add(value)
}
var i = 0;
for(const key of nodeNames){
	nodes.push({name:key})
	nodeIds[key]=i;
	i++;
}

var links = [];
for(const recipe of data.recipes){
	if(!skipManufactory[recipe.manufactory]){
		for (const [key, value] of Object.entries(convertIngredients(recipe))) {
			links.push({source:nodeIds[key],target:nodeIds[recipe.item], sourceName:key,targetName:recipe.item,value:1});
		}
	}
}
var graph = {
nodes:nodes,
links:links};

// Constructs a new Sankey generator with the default settings.
sankey
  .nodes(graph.nodes)
  .links(graph.links)
  .layout(1);

// add in the links
var link = svg.append("g")
.selectAll(".link")
.data(graph.links)
.enter()
.append("path")
  .attr("class", "link")
  .attr("d", sankey.link() )
  .style("stroke-width", function(d) { return Math.max(1, d.dy); })
  .sort(function(a, b) {
	  return b.dy - a.dy;
	  });

// add in the nodes
var node = svg.append("g")
.selectAll(".node")
.data(graph.nodes)
.enter().append("g")
  .attr("class", "node")
  .attr("transform", function(d) {
	  return "translate(" + d.x + "," + d.y + ")";
	  })
  .call(d3.drag()
	.subject(function(d) { return d; })
	.on("start", function() { this.parentNode.appendChild(this); })
	.on("drag", dragmove));

// add the rectangles for the nodes
node
.append("rect")
  .attr("height", function(d) { return 10+d.dy; })
  .attr("width", sankey.nodeWidth())
  
  .style("fill", function(d) { return d.color = color(d.name.replace(/ .*/, "")); })
  .style("stroke", function(d) { return d3.rgb(d.color).darker(2); })
// Add hover text
.append("title")
  .text(function(d) { return d.name + "\n" + "Use " + d.value + " Time"; });

// add in the title for the nodes
node
  .append("text")
	.attr("x", -6)
	.attr("y", function(d) { return d.dy / 2; })
	.attr("dy", ".35em")
	.attr("text-anchor", "end")
	.attr("transform", null)
	.text(function(d) { return d.name; })
  .filter(function(d) { return d.x < width / 2; })
	.attr("x", 6 + sankey.nodeWidth())
	.attr("text-anchor", "start");

// the function for moving the nodes
function dragmove(d) {
d3.select(this)
  .attr("transform",
		"translate("
		   + d.x + ","
		   + (d.y = Math.max(
			  0, Math.min(height - d.dy, d3.event.y))
			 ) + ")");
sankey.relayout();
link.attr("d", sankey.link() );
}

function highlight(d) {
	d3.select(this);
}

