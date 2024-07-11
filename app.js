

d
// app.js - Vertical Bar Chart

// app.js - Line Chart
d3.csv("line_data.csv").then(data => {
    const margin = {top: 20, right: 30, bottom: 40, left: 50},
          width = 800 - margin.left - margin.right,
          height = 400 - margin.top - margin.bottom;
 
    const svg = d3.select("#line-chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
 
    // Background
    svg.append("rect")
        .attr("width", width)
        .attr("height", height)
        .attr("fill", "#f0f0f0");

   const parseDate = d3.timeParse("%Y-%m-%d");

   data.forEach(d => {
       d.date = parseDate(d.date);
       d.value1 = +d.value1;
       d.value2 = +d.value2;
   });

   const x = d3.scaleTime()
       .domain(d3.extent(data, d => d.date))
       .range([0, width]);

   const y = d3.scaleLinear()
       .domain([0, d3.max(data, d => Math.max(d.value1, d.value2))]).nice()
       .range([height, 0]);

   svg.append("g")
       .attr("transform", `translate(0,${height})`)
       .call(d3.axisBottom(x));

   svg.append("g")
       .call(d3.axisLeft(y));

   const line1 = d3.line()
       .x(d => x(d.date))
       .y(d => y(d.value1));

   const line2 = d3.line()
       .x(d => x(d.date))
       .y(d => y(d.value2));

   svg.append("path")
       .data([data])
       .attr("fill", "none")
       .attr("stroke", "steelblue")
       .attr("stroke-width", 1.5)
       .attr("d", line1);

   svg.append("path")
       .data([data])
       .attr("fill", "none")
       .attr("stroke", "red")
       .attr("stroke-width", 1.5)
       .attr("d", line2);
});
