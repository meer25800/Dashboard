d3.csv("population.csv").then(data => {
    const width = 450, height = 450, margin = 40;
    const radius = Math.min(width, height) / 2 - margin;

    const svg = d3.select("#pie-chart").append("svg")
        .attr("width", width + 200)  // Adding extra width for the legend
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${(width + 200) / 2},${height / 2})`);  // Centering the pie chart

    // Background
    svg.append("rect")
        .attr("x", -(width + 200) / 2)
        .attr("y", -height / 2)
        .attr("width", width + 450)
        .attr("height", height)
        .attr("fill", "rgb(225, 225, 236)");

    // Calculate total population
    const totalPopulation = d3.sum(data, d => +d.population);

    // Process data
    const pie = d3.pie()
        .value(d => +d.population);

    const data_ready = pie(data);

    // Create color scale
    const color = d3.scaleOrdinal()
        .domain(data.map(d => d.country))
        .range(d3.schemeCategory10);

    // Create arcs
    const arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius);

    // Create slices
    const slices = svg.selectAll('slice')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', d => color(d.data.country))
        .attr("stroke", "white")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)
        .on('mouseover', function (event, d) {
            d3.select(this)
                .style("opacity", 1)
                .attr("fill", d3.rgb(color(d.data.country)).brighter(0.5));  // Change color on hover
            d3.select(`#label-${d.data.country}`).style("visibility", "visible");
        })
        .on('mouseout', function (event, d) {
            d3.select(this)
                .style("opacity", 0.7)
                .attr("fill", color(d.data.country));  // Reset color on mouse out
            d3.select(`#label-${d.data.country}`).style("visibility", "hidden");
        })
        .transition()
        .duration(1000)
        .attrTween('d', function (d) {
            const i = d3.interpolate(d.startAngle, d.endAngle);
            return function (t) {
                d.endAngle = i(t);
                return arc(d);
            };
        });

    // Add labels
    svg.selectAll('slice')
        .data(data_ready)
        .enter()
        .append('text')
        .attr('id', d => `label-${d.data.country}`)
        .text(d => `${d.data.country}: ${(d.data.population / totalPopulation * 100).toFixed(1)}%`)
        .attr("transform", d => `translate(${arc.centroid(d)})`)
        .style("text-anchor", "middle")
        .style("font-size", 15)
        .style("fill", "white")
        .style("visibility", "hidden");

    // Add legend
    const legend = svg.append("g")
        .attr("class", "legend")
        .attr("transform", `translate(${radius + margin}, -${height / 2 - margin})`);

    legend.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', 50)
        .attr('y', (d, i) => i * 25)
        .attr('width', 20)
        .attr('height', 20)
        .attr('fill', d => color(d.country));

    legend.selectAll('text')
        .data(data)
        .enter()
        .append('text')
        .attr('x', 80)
        .attr('y', (d, i) => i * 25 + 15)
        .style("text-anchor", "start")
        .text(d => `${d.country}: ${d.population.toLocaleString()}`);
});
