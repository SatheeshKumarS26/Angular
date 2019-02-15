import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import {toJson} from './tree';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {CompleteArray, getPrimaryArray, getSecondaryArray} from './class';


@Component({
  selector: 'app-collapsable',
  templateUrl: './collapsable.component.html',
  styleUrls: ['./collapsable.component.css']
})
export class CollapsableComponent implements OnInit {

  // data = {
  //   'name': 'ADDRESS',
  //   'color' : '#F94B4C',
  //   'enableClick' : true,
  //   'children': [
  //    {
  //     'name': 'MEMBER',
  //     'color' : 'white',
  //     'enableClick' : false,
  //     'children' : []
  //    },
  //    {
  //     'name': 'PROVIDER',
  //     'color' : 'white',
  //     'enableClick' : false,
  //     'children' : []
  //    }
  //   ]
  //  };
   data;
   obj: any[];
   selectedValues: string[] = [];
   listofArray = [];
   primaryTable = [];
   secondaryTable = [];
   joinListMap = new Map();

  constructor(private http: HttpClient) {
    this.getJSON('5c657ec653a7a44e26207361', '5c657ee853a7a44e2620744a').subscribe((data: any) => {this.obj = data.data.relationshipInfo; console.log(this.obj);});
   }

  ngOnInit() {
  // this.selectedValues.push(this.data.name);
  setTimeout(() => {
    this.primaryTable = getPrimaryArray(this.obj);
  this.secondaryTable = getSecondaryArray(this.obj);
  for (const i of this.primaryTable) {
  this.joinListMap.set(i.primaryTableName, CompleteArray(i.primaryTableId, i.primaryTableName, this.secondaryTable));
  }
  }, 5000);
  setTimeout(() => {const data1 = JSON.parse(toJson(['ADDRESS'], this.joinListMap));
  console.log(data1); this.data = data1; this.createchart();}, 5000);
  }

getJSON(tableid, workspaceId) {
    const url = 'http://50.112.166.136:9000/' + 'metalyzer/tablesRelationShip?tableId=' + tableid + '&workspaceId=' + workspaceId;
    return this.http.get<any[]>(url, {headers: this.getHeaders()});
}

getHeaders() {
  return new HttpHeaders({
    'Content-Type': 'application/json',
// tslint:disable-next-line: max-line-length
    'Authorization': 'Bearer ' + ''
  });
}

createchart() {
// push the parent node
const width = 1000,
height = 1000;

let i = 0;

// const root = d3.hierarchy(this.data);
const transform = d3.zoomIdentity;
let node, link;

const svg = d3.select('body').append('svg')
.call(d3.zoom().scaleExtent([1 / 2, 8]).on('zoom', zoomed))
.append('g')
.attr('transform', 'translate(40,0)');

const div = d3.select('body').append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0);

const simulation = d3.forceSimulation()
.force('link', d3.forceLink().id(function(d: any) { return d.id; }).distance(100).strength(1)) // distance & strength added
.force('charge', d3.forceManyBody().distanceMax(300).strength(-1000)) // added min, stength default:-15
.force('center', d3.forceCenter( width / 2, height / 4 ))
.on('tick', ticked);

// update starts
function update(data) {
const root = d3.hierarchy(data);
const nodes = flatten(root);
const links = root.links();


link = svg
.selectAll('.link')
.data(links, function(d: any) { return d.target.id; });

link.exit().remove();

const linkEnter = link
.enter()
.append('line')
.attr('class', 'link')
.style('stroke', '#000' )
.style('opacity', '0.2')
.style('stroke-width', 2).attr('marker-end', 'url(#end)');

svg.append('svg:defs').selectAll('marker')
.data(['end'])      // Different link/path types can be defined here
.enter().append('svg:marker')    // This section adds in the arrows
.attr('id', String)
.attr('viewBox', '0 -5 10 10')
.attr('refX', 18)
.attr('markerWidth', 6)
.attr('markerHeight', 6)
.attr('orient', 'auto')
.append('svg:path')
.attr('d', 'M0,-5L10,0L0,5').style('fill', '#000000');

link = linkEnter.merge(link);

node = svg
.selectAll('.node')
.data(nodes, function(d: any) { return d.id; });

node.exit().remove();

const nodeEnter = node
.enter()
.append('g')
.attr('class', 'node')
.attr('stroke', '#666')
.attr('stroke-width', 2)
.style('fill', color)
.style('opacity', 1)
.on('click', clicked)
.call(d3.drag()
  .on('start', dragstarted)
  .on('drag', dragged)
  .on('end', dragended));

nodeEnter.append('circle')
.attr('r', 10)
.style('text-anchor', function(d) { return d.children ? 'end' : 'start'; });

// Cardinality
// nodeEnter.append('text')
// .attr('dx', '-.25em')
// .attr('dy', '.35em')
//         .text(function(d) { if (d.children) { return '0'; } else {return '1'; } });

// Join Name
// nodeEnter.append('text').attr('letter-spacing', '1px').attr('font-size', 15)
// .attr('dx', -93)
// .attr('dy', -4)
// .text(function(d) { if (d.children) { return 'Join_Name'; } } );

nodeEnter.append('text')
.attr('font-size', 10).attr('font-weight', 100).attr('letter-spacing', '2px')
        .attr('dx', 15)
        .attr('dy', 4)
        .text(function(d: any) { return d.data.name; });

nodeEnter.on('mouseover', function(d) {
  let ifSelected;
  if (!d.parent.data.enableClick) {
    ifSelected = 'Value Already Selected in this Level';
  } else {
    ifSelected = 'Select Value';
  }
  div.transition().duration(200).style('opacity', .9);
  div.html(ifSelected)
  .style('left', (d3.event.pageX) + 'px')
  .style('top', (d3.event.pageY - 28) + 'px');

          link.style('stroke-dasharray', function(l) {
            if (d === l.source || d === l.target) {
               return '5,5';
            }
            });
        });

nodeEnter.on('mouseout', function() {
  div.transition().duration(500).style('opacity', 0);
          link.style('stroke-dasharray', 0);
        });


node = nodeEnter.merge(node);
simulation.nodes(nodes);
simulation.force<any>('link').links(links);
}
// end of update

function color(d) {
  return d.data.color;
  // return d.parent ? 'white' : '#F94B4C';
// return d._children ? '#51A1DC' // collapsed package
//   : d.children ? '#51A1DC' // expanded package
//   : '#F94B4C'; // leaf node
}


function ticked() {
link
.attr('x1', function(d) { return d.source.x; })
.attr('y1', function(d) { return d.source.y; })
.attr('x2', function(d) { return d.target.x; })
.attr('y2', function(d) { return d.target.y; });

node
.attr('transform', function(d) { return `translate(${d.x}, ${d.y})`; });

// rotate
// labelLine.attr('transform', function (d) {
//   if (d.target.x < d.source.x) {
//       const bbox = this.getBBox();

//       const rx = bbox.x + bbox.width / 2;
//       const ry = bbox.y + bbox.height / 2;
//       return 'rotate(180 ' + rx + ' ' + ry + ')';
//   } else {
//       return 'rotate(0)';
//   }
// });

}

const self = this;
function clicked(d) {
if (!d3.event.defaultPrevented) {
// if (d.children) {
//   d._children = d.children;
//   d.children = null;
// } else {
//   d.children = d._children;
//   d._children = null;
// }
// update();
let currentColor = d3.select(this).style('fill');
if (currentColor !== 'rgb(249, 75, 76)') {
if (d.parent.data.enableClick || d.data.enableClick) {
if (currentColor === 'white') {
  currentColor = 'black';
  d.parent.data.enableClick = false;
  d.data.enableClick = true;
  self.selectedValues.push(d.data.name);
  // const data1 = JSON.parse(toJson(self.selectedValues));
  // update(data1);
} else {
  currentColor = 'white';
  d.data.enableClick = false;
  d.parent.data.enableClick = true;
  self.selectedValues.pop();
  // const data1 = JSON.parse(toJson(self.selectedValues));
  // update(data1);
}
d3.select(this).style('fill', currentColor);
}
}
}
}

function dragstarted(d) {
if (!d3.event.active) { simulation.alphaTarget(0.3).restart(); }
d.fx = d.x;
d.fy = d.y;
}

function dragged(d) {
d.fx = d3.event.x;
d.fy = d3.event.y;
d.px = validate(d.px, 0, width);
d.py = validate(d.py, 0, height);
}

function validate(x, a, b) {
  if (x < a) {
    x = a;
  }
  if (x > b) {
  x = b;
  }
  return x;
}

function dragended(d) {
if (!d3.event.active) { simulation.alphaTarget(0); }
d.fx = d.x;
d.fy = d.y;
}

function flatten(rootx) {
const nodes = [];
function recurse(nodex: any) {
if (nodex.children) { nodex.children.forEach(recurse); }
if (!nodex.id) { nodex.id = ++i; } else { ++i; }
nodes.push(nodex);
}
recurse(rootx);
return nodes;
}

function zoomed() {
svg.attr('transform', d3.event.transform);
}

update(this.data);
  }
}


