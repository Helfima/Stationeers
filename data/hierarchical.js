function BezierCurve() {
  const l1 = [4 / 8, 4 / 8, 0 / 8, 0 / 8];
  const l2 = [2 / 8, 4 / 8, 2 / 8, 0 / 8];
  const l3 = [1 / 8, 3 / 8, 3 / 8, 1 / 8];
  const r1 = [0 / 8, 2 / 8, 4 / 8, 2 / 8];
  const r2 = [0 / 8, 0 / 8, 4 / 8, 4 / 8];

  function dot([ka, kb, kc, kd], {a, b, c, d}) {
    return [
      ka * a[0] + kb * b[0] + kc * c[0] + kd * d[0],
      ka * a[1] + kb * b[1] + kc * c[1] + kd * d[1]
    ];
  }

  return class BezierCurve {
    constructor(a, b, c, d) {
      this.a = a;
      this.b = b;
      this.c = c;
      this.d = d;
    }
    split() {
      const m = dot(l3, this);
      return [
        new BezierCurve(this.a, dot(l1, this), dot(l2, this), m),
        new BezierCurve(m, dot(r1, this), dot(r2, this), this.d)
      ];
    }
    toString() {
      return `M${this.a}C${this.b},${this.c},${this.d}`;
    }
  };
}

class Line {
    constructor(a, b) {
      this.a = a;
      this.b = b;
    }
    split() {
      const {a, b} = this;
      const m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
      return [new Line(a, m), new Line(m, b)];
    }
    toString() {
      return `M${this.a}L${this.b}`;
    }
}

class Path {
    constructor(_) {
        this._ = _;
        this._m = undefined;
    }
    moveTo(x, y) {
        this._ = [];
        this._m = [x, y];
    }
    lineTo(x, y) {
        this._.push(new Line(this._m, this._m = [x, y]));
    }
    bezierCurveTo(ax, ay, bx, by, x, y) {
        this._.push(new BezierCurve(this._m, [ax, ay], [bx, by], this._m = [x, y]));
    }
    *split(k = 0) {
        try{
            const n = this._.length;
            const i = Math.floor(n / 2);
            const j = Math.ceil(n / 2);
            const a = new Path(this._.slice(0, i));
            const b = new Path(this._.slice(j));
            if (i !== j) {
                const [ab, ba] = this._[i].split();
                a._.push(ab);
                b._.unshift(ba);
            }
            if (k > 1) {
                yield* a.split(k - 1);
                yield* b.split(k - 1);
            } else {
                yield a;
                yield b;
            }
        }catch(ex){
            console.log(ex);
        }
    }
    toString() {
        return this._.join("");
    }
}

function path([source, target]) {
    const p = new Path;
    line.context(p)(source.path(target));
    return p;
}

function id(node) {
    return `${node.parent ? id(node.parent) + "." : ""}${node.data.name}`;
}
function nodeName(node) {
    return `${node.data.name}`;
}

function bilink(root) {
    const reactifs = {};
    root.each(function(node){
        if(node.data.type == "reactif") reactifs[node.data.name] = node;
    });
    for (const d of root){
        d.incoming = [];
        d.outgoing = [d.ancestors()];
    }
    for (const d of root) {
        if(d.outgoing == null) continue;
        for (const o of d.outgoing) {
            if(o[1] != null)
            o[1].incoming.push(o);
        }
    }
    // for (const d of root){
    //     if(d.link == null)d.link = [];
                    
    //     var ingredients = d.data.ingredients;
    //     if(ingredients != null){
    //         for (const [key, value] of Object.entries(ingredients)) {
    //             var reactif = reactifs[key];
    //             if(reactif != null){
    //                 links.push([d,reactif]);
    //                 //reactif.outgoing.push(d);
    //                 console.log(d);
    //             }
    //         }
    //     }
    // }
    return root;
}


function chart(data) {
    const hdata = d3.hierarchy(data);
    const root = tree(bilink(hdata.sort((a, b) => d3.ascending(a.height, b.height) || d3.ascending(a.data.name, b.data.name))));
  
    const svg = d3.create("svg")
        .attr("viewBox", [-width / 2, -width / 2, width, width]);
  
    const node = svg.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
      .selectAll("g")
      .data(root)
      .join("g")
        .attr("transform", d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y},0)`)
      .append("text")
        .attr("dy", "0.31em")
        .attr("x", d => d.x < Math.PI ? 6 : -6)
        .attr("text-anchor", d => d.x < Math.PI ? "start" : "end")
        .attr("transform", d => d.x >= Math.PI ? "rotate(180)" : null)
        .text(d => nodeName(d))
        .call(text => text.append("title").text(d => `${nodeName(d)}
  ${d.outgoing.length} outgoing
  ${d.incoming.length} incoming
  Time:${d.data.Time}`));
  
//   svg.append("g")
//         .attr("fill", "none")
//         .attr("stroke", "#f00")
//       .selectAll("path")
//       .data(links)
//       .join("path")
//         .style("mix-blend-mode", "multiply")
//         .attr("d", ([i, o]) => line(i.path(o)))
//         .each(function(d) { d.path = this; });

    svg.append("g")
        .attr("fill", "none")
      .selectAll("path")
      .data(d3.transpose(root.leaves()
        .flatMap(function(leaf){
            return leaf.outgoing.map(path);
        })
        .map(path => Array.from(path.split(k)))))
      .join("path")
        .style("mix-blend-mode", "darken")
        .attr("stroke", (d, i) => color(d3.easeQuad(i / ((1 << k) - 1))))
        .attr("d", d => d.join(""));
    
    

    return svg.node();
}
// format data
var elements = {};
var nodes = [];
var root = {name:"stationeers", children:[]};
var links = [];

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

function test1(){
    for(const key of ingredients){
        var element = {name:key, type:"reactif", children:[]};
        root.children.push(element);
    }
    // build manufactory
    for(const recipe of data_recipes.recipes){
        var key = recipe.manufactory;
        var element = elements[key];
        if(element == null) {
            element = {name:key, children:[]};
            elements[key] = element;
            root.children.push(element)
        }
    }
    // build recipe
    for(const recipe of data_recipes.recipes){
        var key = recipe.item;
        var element = elements[key];
        if(element == null) {
            //element = {name:key, children:[]};
            var time = recipe.ingredients.Time;
            element = {name:key, Time:time, ingredients:recipe.ingredients};
            elements[key] = element;
            //nodes.push(element)
        }
        var factory = elements[recipe.manufactory];
        factory.children.push(element);
        
    }
}

function test2(){
    for(const key of ingredients){
        var element = {name:key, type:"reactif", children:[]};
        root.children.push(element);
        elements[key] = element;
    }
    
    // build recipe
    for(const recipe of data_recipes.recipes){
        var key = recipe.item;
        var element = elements[key];
        if(element == null) {
            //element = {name:key, children:[]};
            var time = recipe.ingredients.Time;
            element = {name:key, Time:time, ingredients:recipe.ingredients};
            elements[key] = element;
            //nodes.push(element)
        }
        for (const [key, value] of Object.entries(recipe.ingredients)) {
            var reactif = elements[key];
            if(reactif != null){
                reactif.children.push(element);
            }
        }
        
        
    }
}

test2();

var k = 6;
var width = 2000;
var radius = width / 2;
var tree = d3.cluster()
    .size([2 * Math.PI, radius - 100]);
function color(t){
    return d3.interpolateRdBu(1 - t);
}
var line = d3.lineRadial()
    .curve(d3.curveBundle)
    .radius(d => d.y)
    .angle(d => d.x);

var svg = chart(root);
console.log(svg);

d3.select("body").append(() => svg);
