import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
const url =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

const w = 800;
const h = 400;
const padding = 60;

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    const dataset = data.data;

    const dates = dataset.map((e) => new Date(e[0]));

    const xScale = d3
      .scaleUtc()
      .domain([d3.min(dates), d3.max(dates)])
      .range([padding, w - padding]);

    const yScale = d3
      .scaleLinear()
      .domain([d3.min(dataset, d=>d[1]), d3.max(dataset, (d) => d[1])])
      .range([h - padding, padding]);

    const svg = d3
      .select("body")
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .style("background-color", "#f4fffc");

    svg
      .selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d, i) => xScale(dates[i]))
      .attr("y", d=>yScale(d[1]))
      .attr("width", w/dataset.length)
      .attr("height", (d) => yScale(0) - yScale(d[1]))
      .attr("fill", "#33ffca")
      .append("title")
      .text(d=>d);
  });
