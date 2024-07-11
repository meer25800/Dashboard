// app.js - Horizontal Bar Chart
d3.csv("covid_19_cases.csv").then(data => {
    const margin = {top: 20, right: 30, bottom: 40, left: 110},
          width = 800 - margin.left - margin.right,
          height = 400 - margin.top - margin.bottom;
 
    const svg = d3.select("#horizontal-bar-chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", 400)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
 
    // Background
    svg.append("rect")
        .attr("width", width)
        .attr("height", height)
        .attr("fill", "#f0f0f0");
 
     // X axis
      // X axis
      const x = d3.scaleLinear()
      .domain([0, d3.max(data, d => +d.total_cases)])
      .range([0, width]);

  svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("class", "axis-label");

  // Y axis
  const y = d3.scaleBand()
      .domain(data.map(d => d.country))
      .range([0, height])
      .padding(0.1);

  svg.append("g")
      .call(d3.axisLeft(y))
      .selectAll("text")
      .attr("class", "axis-label");

  // Create bars
  svg.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", 0)
      .attr("y", d => y(d.country))
      .attr("width", 0)  // Start width at 0 for transition
      .attr("height", y.bandwidth())
      .attr("fill", (d, i) => d3.schemeCategory10[i % 10])
      .on('mouseover', function (event, d) {
          d3.select(this).style("fill-opacity", 1);
          showInfo(d);
      })
      .on('mouseout', function () {
          d3.select(this).style("fill-opacity", 0.7);
        
      })
      .transition()
      .duration(800)
      .attr("width", d => x(d.total_cases));

  // Add right side information within the same SVG
  const infoBox = svg.append("g")
      .attr("class", "info-box")
      .attr("transform", `translate(${width + 20}, 0)`)
      .style("display", "none");

  infoBox.append("text")
      .attr("class", "country")
      .style("fill", "#f2f2f2");

  infoBox.append("text")
      .attr("class", "total-cases")
      .style("fill", "#f2f2f2")
      .attr("y", 20);

  infoBox.append("text")
      .attr("class", "total-deaths")
      .style("fill", "#f2f2f2")
      .attr("y", 40);

  infoBox.append("text")
      .attr("class", "total-recovered")
      .style("fill", "#f2f2f2")
      .attr("y", 60);

  infoBox.append("text")
      .attr("class", "active-cases")
      .style("fill", "#f2f2f2")
      .attr("y", 80);

  function showInfo(d) {
      infoBox.style("display", null);
      infoBox.select(".country").text(`Country: ${d.country}`);
      infoBox.select(".total-cases").text(`Total Cases: ${(+d.total_cases).toLocaleString()}`);
      infoBox.select(".total-deaths").text(`Total Deaths: ${(+d.total_deaths).toLocaleString()}`);
      infoBox.select(".total-recovered").text(`Total Recovered: ${(+d.total_recovered).toLocaleString()}`);
      infoBox.select(".active-cases").text(`Active Cases: ${(+d.active_cases).toLocaleString()}`);
  }

 
  

});