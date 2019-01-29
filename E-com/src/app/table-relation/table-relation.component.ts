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
    .force('charge_force', d3.forceManyBody().strength(-200).distanceMax(200).distanceMin(30))
    .force('center_force', d3.forceCenter(width / 4, height / 4));

const node = svg.append('g')
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

simulation.on('tick', tickActions );

const link_force =  d3.forceLink(this.links_data)
                        .id(function(d: any) { return d.name; });


simulation.force('links', link_force);

const link = svg.append('g')
      .attr('class', 'links')
    .selectAll('line')
    .data(this.links_data)
    .enter().append('line')
      .attr('stroke-width', 2);

function tickActions() {
    node
        .attr('cx', function(d) { return (d.x); })
        .attr('cy', function(d) { return (d.y); });
        // append('text')
        // .attr('cx', function(d) { return (d.x); })
        // .attr('cy', function(d) { return (d.y); })
        // .text(function(d: any) { return d.name; })
    link
        .attr('x1', function(d: any) { return (d.source.x); })
        .attr('y1', function(d: any) { return (d.source.y); })
        .attr('x2', function(d: any) { return (d.target.x); })
        .attr('y2', function(d: any) { return (d.target.y); });

  }
}
}
