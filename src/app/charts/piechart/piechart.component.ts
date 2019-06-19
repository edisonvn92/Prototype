import { Component, OnInit, AfterContentInit, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css'],  encapsulation: ViewEncapsulation.None
})
export class PiechartComponent implements OnInit, AfterContentInit {
  ngAfterContentInit(): void {
    // var svg = d3.select("svg");
    // var width = 400;
    // var height = 400;
    // var radius = Math.min(width, height) / 2;
    // var color = d3.scaleOrdinal(['gray', 'green', 'brown', 'orange', 'yellow', 'red', 'purple']);

    // var g = svg.append("g")
    //         .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    // var pie = d3.pie()
    //   .value(function (d) { return d.percent; });

    // var path = d3.arc()
    //   .outerRadius(radius - 10)
    //   .innerRadius(0);

    // var label = d3.arc()
    //   .outerRadius(radius)
    //   .innerRadius(radius - 80);

    //   this.http.get('assets/population.csv', { responseType: 'text' }).subscribe(table => {
    //     var data = d3.csvParse(table);
    //       var arc = g.selectAll(".arc")
    //       .data(pie(data))
    //       .enter()
    //       .append("g")
    //       .attr("class", "arc");

    //     arc.append("path")
    //       .attr("d", path)
    //       .attr("fill", function (d) { return color(d.data.states); });

    //       arc.append("text").attr("transform", function(d) { 
    //         return "translate(" + label.centroid(d) + ")"; 
    //      }).text(function(d) { return d.data.states; });

    //    });


    // svg.append("g")
    //   .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")
    //   .append("text").text("Top population states in india")
    //   .attr("class", "title");

    var width = 300,
      height = 300,
      offset = 100,
      radius = Math.min(width, height) / 2;

    var color = d3.scaleOrdinal()
      .range(["#65A6BF", "#9AC4D5", "#CCE2EA"]);

      var arc = d3.arc()
      .innerRadius(radius * 0.5)         // This is the size of the donut hole
      .outerRadius(radius * 0.8)

      var outerArc = d3.arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9)

    var pie = d3.pie()
      .sort(null)
      .startAngle(1.1 * Math.PI)
      .endAngle(3.1 * Math.PI)
      .value(function (d) { return d.songs; });

    var data_ready = pie(d3.entries(data))

    var data = [
      { genre: 'other', songs: 12 },
      { genre: '2000s', songs: 42 },
      { genre: '2010s', songs: 63 }
    ];

    var svg = d3.select("app-piechart").append("svg")
      .attr("id", "chart")
      .attr("width", width + offset)
      .attr("height", height + offset)
      .attr('viewBox', '0 0 ' + width + offset + '' + width + offset + '')
      .attr('perserveAspectRatio', 'xMinYMid')
      .append("g")
      .attr("transform", "translate(" + (width + offset) / 2 + "," + (height + offset) / 2 + ")");

    data.forEach(function (d) {
      d.songs = +d.songs;
    });

    var g = svg.selectAll(".arc")
      .data(pie(data))
      .enter().append("g")
      .attr("class", "arc");

    g.append("path")
      .style("fill", function (d) { return color(d.data.genre); })
      .transition().delay(function (d, i) { return i * 500; }).duration(500)
      .attrTween('d', function (d) {
        var i = d3.interpolate(d.startAngle + 0.1, d.endAngle);
        return function (t) {
          d.endAngle = i(t);
          return arc(d);
        };
      });
    svg
      .selectAll('allPolylines')
      .data(data_ready)
      .enter()
      .append('polyline')
        .attr("stroke", "black")
        .style("fill", "none")
        .attr("stroke-width", 1)
        .attr('points', function(d) {
          var posA = arc.centroid(d) // line insertion in the slice
          var posB = outerArc.centroid(d) // line break: we use the other arc generator that has been built only for that
          var posC = outerArc.centroid(d); // Label position = almost the same as posB
          var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
          posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
          return [posA, posB, posC]
        })
    

    g.append("text")
      .attr("transform", function (d) { return "translate(" + outerArc.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .attr("class", "d3-label")
      .style("text-anchor", "middle")
      .text(function (d) { return d.data.genre; });



  }

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

}

