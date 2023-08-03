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
      .domain([d3.min(dataset, (d) => d[1]), d3.max(dataset, (d) => d[1])])
      .range([h - padding, padding]);

    const svg = d3
      .select("#container")
      .append("svg")
      .attr("width", w)
      .attr("height", h + 50)
      .style("background-color", "#f4fffc");

    const tooltip = d3.select("#container")
    .append("div")
    .attr("id", "tooltip")
    .style("opacity", 0);

    const rects = svg
      .selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("data-gdp", (d) => d[1])
      .attr("data-date", (d) => d[0])
      .attr("x", (d) => xScale(new Date(d[0])))
      .attr("y", (d) => yScale(d[1]))
      .attr("width", w / dataset.length)
      .attr("height", (d) => yScale(0) - yScale(d[1]))
      .attr("fill", "#33ffca");

    svg
      .append("g")
      .attr("transform", "translate(1, " + (h - padding + 4) + ")")
      .attr("id", "x-axis")
      .call(d3.axisBottom(xScale));

    svg
      .append("g")
      .attr("transform", "translate(" + (padding + 1) + ", 3)")
      .attr("id", "y-axis")
      .call(d3.axisLeft(yScale));

    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -250)
      .attr("y", 80)
      .text("Gross Domestic Product");

    svg
      .append("text")
      .text("More Information: http://www.bea.gov/national/pdf/nipaguid.pdf")
      .attr("x", w - 590)
      .attr("y", h + 30)
      .attr("id", "source-link")
      .style("fill", "rgba(0, 0, 0, 0.74)")
      .style("font-size", "0.9em");

      rects.on("mouseover", (event, d) => {
        const gdpValue = d[1];
        let formattedGDP = gdpValue;

        if (gdpValue >= 1000) {
          // Add the dot after the 3rd digit from the right
          const gdpString = gdpValue.toString();
          let lastNonFractional;
          if(gdpString.includes(".")){
            lastNonFractional = gdpString.search(/\./)
          } else lastNonFractional = gdpString.length

          formattedGDP = gdpString.slice(0, lastNonFractional - 3) + "," + gdpString.slice(lastNonFractional - 3);
        }

        tooltip.transition().duration(200).style("opacity", 1);
        tooltip.html(`Date: ${d[0]}<br/>GDP: $${formattedGDP} Billion`)
               .style("left", event.pageX + 15 + "px")
               .style("top", event.pageY + "px")
               .attr("data-date", d[0]);
      })
      
      rects.on("mouseout", () => {
        tooltip.transition().duration(200).style("opacity", 0);
      });
  });
