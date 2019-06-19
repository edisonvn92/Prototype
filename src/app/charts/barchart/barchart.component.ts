import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css'],  encapsulation: ViewEncapsulation.None
})
export class BarchartComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
    var data = [10, 20, 30, 15, 4, 26, 33];
    var width = 800,
      scaleFactor = 15,
      barHeight = 30;
    var barGraph = d3.select("app-barchart")
      .append("svg")
      .attr("class", "bar-chart")
      .attr("width", width)
      .attr("height", barHeight * data.length);

    var bar = barGraph.selectAll("g")
      .data(data)
      .enter()
      .append("g")
      .attr("transform", function (d, i) {
        return "translate(0," + i * barHeight + ")";
      });

    bar.append("rect")
      .attr("height", barHeight - 1)
      .transition().delay(1000).duration(2000)
      .attr("width", function (d) {
        return d * scaleFactor;
      });


    bar.append("text")
      .attr("x", function (d) { return (d * scaleFactor); })
      .attr("y", barHeight / 2)
      .attr("dy", ".35em")
      .text(function (d) { return d; });
  }

  constructor() { }

  ngOnInit() {
  }

}
