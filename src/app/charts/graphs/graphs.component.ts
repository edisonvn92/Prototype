import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css'],  encapsulation: ViewEncapsulation.None
})
export class GraphsComponent implements OnInit, AfterViewInit {
 
  ngAfterViewInit(): void {
    // set the dimensions and margins of the graph
    var margin = { top: 20, right: 20, bottom: 30, left: 50 },
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    // set the ranges
    var x = d3.scaleTime().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select("app-graphs").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g").attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    // this.http.get('assets/file.csv', { responseType: 'text' }).subscribe(table => {
    //   var data = d3.csvParse(table);
    var data =    [ {"year": "2006","population": "40"}, {"year": "2008","population": "45"},
          {"year": "2010","population": "48"},{ "year": "2012", "population": "51"},
          {"year": "2014","population": "53"},{"year": "2016", "population": "57" },
          { "year": "2017","population": "62"}];
      data.forEach(function (d) {
        d.year = d.year;
        d.population = d.population;
      });
      // Scale the range of the data
      x.domain(d3.extent(data, function (d) { return d.year; }));
      y.domain([0, d3.max(data, function (d) { return +d.population; })]);

      // define the line
      let valueline = d3.line<any>()
        .x(function (d) { return x(+d['year']); })
        .y(function (d) { return y(+d['population']); });

      // Add the valueline path.
      svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("d", valueline);
        

      // Add the X Axis
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

      // Add the Y Axis
      svg.append("g")
        .call(d3.axisLeft(y));



    // })

  }

  constructor() { }

  ngOnInit() {
  }

}
