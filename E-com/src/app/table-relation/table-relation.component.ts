import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges } from '@angular/core';
import {DataModel} from '../../data/data-model';
import * as d3 from 'd3';

@Component({
  selector: 'app-table-relation',
  templateUrl: './table-relation.component.html',
  styleUrls: ['./table-relation.component.css']
})
export class TableRelationComponent implements OnInit, OnChanges {
  @Input() data: any[];

  links_data = [
    {'source': 'Sylvester', 'target': 'Gordon', 'type': 'A' },
    {'source': 'Sylvester', 'target': 'Lillian', 'type': 'A' },
    {'source': 'Sylvester', 'target': 'Mary', 'type': 'A'},
    {'source': 'Sylvester', 'target': 'Jamie', 'type': 'A'},
    {'source': 'Sylvester', 'target': 'Jessie', 'type': 'A'},
    {'source': 'Sylvester', 'target': 'Helen', 'type': 'A'},
    {'source': 'Helen', 'target': 'Gordon', 'type': 'A'},
    {'source': 'Mary', 'target': 'Lillian', 'type': 'A'},
    {'source': 'Ashton', 'target': 'Mary', 'type': 'A'},
    {'source': 'Duncan', 'target': 'Jamie', 'type': 'A'},
    {'source': 'Gordon', 'target': 'Jessie', 'type': 'A'},
    {'source': 'Sylvester', 'target': 'Fray', 'type': 'E'},
    {'source': 'Fray', 'target': 'Mauer', 'type': 'A'},
    {'source': 'Fray', 'target': 'Cynthia', 'type': 'A'},
    {'source': 'Fray', 'target': 'Percy', 'type': 'A'},
    {'source': 'Percy', 'target': 'Cynthia', 'type': 'A'},
    {'source': 'Infante', 'target': 'Duke', 'type': 'A'},
    {'source': 'Duke', 'target': 'Gordon', 'type': 'A'},
    {'source': 'Duke', 'target': 'Sylvester', 'type': 'A'},
    {'source': 'Baron', 'target': 'Duke', 'type': 'A'},
    {'source': 'Baron', 'target': 'Sylvester', 'type': 'E'},
    {'source': 'Evette', 'target': 'Sylvester', 'type': 'E'},
    {'source': 'Cynthia', 'target': 'Sylvester', 'type': 'E'},
    {'source': 'Cynthia', 'target': 'Jamie', 'type': 'E'},
    {'source': 'Mauer', 'target': 'Jessie', 'type': 'E'}
];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(): void {
    if (!this.data) { return; }
    this.createChart();
  }

  private createChart(): void {
    const svg = d3.select('svg'),
    width = +svg.attr('width'),
    height = +svg.attr('height');

const simulation = d3.forceSimulation()
          .nodes(this.data);

simulation
    .force('charge_force', d3.forceManyBody().distanceMin(30).distanceMax(200).strength(-500))
    .force('center_force', d3.forceCenter(width / 2, height / 2));

    const g = svg.append('g')
    .attr('class', 'everything');

const node = g.append('g')
        .attr('class', 'nodes')
        .selectAll('circle')
        .data(this.data)
        .enter()
        .append('circle')
        .attr('r', 10)
        .attr('fill', circleColour);

        function circleColour(d) {
          if (d.sex === 'M') {
              return 'purple';
          } else {
              return 'black';
          }
      }
    const text = g.append('g')
      .selectAll('text')
      .data(this.data)
      .enter().append('text')
        .text(d => d.name)
        .attr('font-size', 15)
        .attr('dx', 15)
        .attr('dy', 4);

simulation.on('tick', tickActions );

const link_force =  d3.forceLink(this.links_data)
                        .id(function(d: any) { return d.name; }).distance(250).strength(1);

simulation.force('links', link_force);

const link = g.append('g')
      .attr('class', 'links')
    .selectAll('line')
    .data(this.links_data)
    .enter().append('line')
      .attr('stroke-width', 2); // .attr('marker-end', 'url(#arrow)');

      // for arrow
      // svg.append('svg:defs').append('svg:marker')
      // .attr('id', 'arrow')
      // .attr('refX', 6)
      // .attr('refY', 6)
      // .attr('markerWidth', 30)
      // .attr('markerHeight', 30)
      // .attr('markerUnits', 'userSpaceOnUse')
      // .attr('orient', 'auto')
      // .append('path')
      // .attr('d', 'M 0 0 12 6 0 12 3 6')
      // .style('fill', '#999');

    const drag_handler = d3.drag()
    .on('start', drag_start)
    .on('drag', drag_drag)
    .on('end', drag_end);

    drag_handler(node);

    const zoom_handler: any = d3.zoom()
    .on('zoom', zoom_actions);

    zoom_handler(svg);

    function zoom_actions() {
    g.attr('transform', d3.event.transform);
}


function tickActions() {
    node
        .attr('cx', function(d) { return (d.x); })
        .attr('cy', function(d) { return (d.y); });
    link
        .attr('x1', function(d: any) { return (d.source.x); })
        .attr('y1', function(d: any) { return (d.source.y); })
        .attr('x2', function(d: any) { return (d.target.x); })
        .attr('y2', function(d: any) { return (d.target.y); });
    text
        .attr('x', d => d.x)
        .attr('y', d => d.y);

  }

  function drag_start(d) {
    if (!d3.event.active) {
    simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
    }
  }

  function drag_drag(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  function drag_end(d) {
    if (!d3.event.active) {
        simulation.alphaTarget(0);
    d.fx = d.x;
    d.fy = d.y;
    }
  }

node.on('click', function(d) {
  link.style('stroke-dasharray', function(l) {
    if (d === l.source || d === l.target) {
       return '5,5';
    }
    });
});

node.on('mouseout', function() {
  link.style('stroke-dasharray', 0);
});
}
}
