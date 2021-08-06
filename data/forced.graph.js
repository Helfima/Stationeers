
function drag(simulation) {
  
    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }
    
    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }
    
    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }
    
    return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
  }

function chart(data) {
    const links = data.links.map(d => Object.create(d));
    const nodes = data.nodes.map(d => Object.create(d));

    var velocity = d3.forceManyBody();
    velocity.strength(-5);
    const simulation = d3.forceSimulation(nodes)
      .force("link", d3.forceLink(links).id(d => d.name))
      .force("charge", velocity)
      .force("center", d3.forceCenter(width / 2, height / 2));

    const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height]);

    const link = svg.append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
    .selectAll("line")
    .data(links)
    .join("line")
      .attr("stroke-width", d => Math.sqrt(d.value));

    const node = svg.append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
    .selectAll("circle")
    .data(nodes)
    .join("circle")
      .attr("r", 5)
      .attr("fill", color(d => d.group))
      .call(drag(simulation));

    node.append("title")
      .text(d => d.name);

    simulation.on("tick", () => {
    link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
  });

  //invalidation.then(() => simulation.stop());

  return svg.node();
}
// format data
var elements = {};
var nodes = [];
var links = [];
var index=2;
var groups = {};

// build ingredient
var skipEngredient ={
	Energy : true,
	Time : true
}
var ingredients = new Set();
for(const recipe of data_recipes.recipes){
    for (const [key, value] of Object.entries(recipe.ingredients)) {
        if(!skipEngredient[key]){
            ingredients.add(key);
        }
    }
}


for(const key of ingredients){
    var element = {name:key, type:"reactif", group:index++};
    elements[key] = element;
    nodes.push(element);
}
// build manufactory
for(const recipe of data_recipes.recipes){
    var key = recipe.manufactory;
    var element = elements[key];
    if(element == null) {
        element = {name:key, group:index++};
        elements[key] = element;
        nodes.push(element)
    }
}
// build recipe
for(const recipe of data_recipes.recipes){
    var key = recipe.item;
    var element = elements[key];
    var factory = recipe.manufactory;
    if(element == null) {
        var group = groups[factory];
        if(group == null){
            group = index++;
            groups[factory] = group;
        }
        var time = recipe.ingredients.Time;
        element = {name:key, Time:time, group:group, ingredients:recipe.ingredients};
        elements[key] = element;
        nodes.push(element)

    }
    var link = {source: factory, target:element.name, value:1};
    links.push(link);
    for (const [key, value] of Object.entries(recipe.ingredients)) {
        if(!skipEngredient[key]){
            var link = {source: key, target:element.name, value:value};
            links.push(link);
        }
    }

}

var height = 2000;
var width = 2000;
var color = d3.scaleOrdinal(d3.schemeCategory10);

var svg = chart({nodes:nodes,links:links});
console.log(svg);

d3.select("body").append(() => svg);
