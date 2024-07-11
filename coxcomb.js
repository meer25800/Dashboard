
  
  

    d3.csv("religion.csv").then(data => {
        const width = 450, height = 450, margin = 40;
        const radius = Math.min(width, height) / 2 - margin;

        const svg = d3.select("#coxcomb-plot").append("svg")
            .attr("width", width)
            .attr("height", height-250)
            .append("g")
            .attr("transform", `translate(${width / 2},${height / 2})`);
           
            svg.append("rect")
            .attr("x", -(width + 200) / 2)
            .attr("y", -height / 2)
            .attr("width", width + 450)
            .attr("height", height)
            .attr("fill", "rgb(225, 225, 236)");
        const tooltip = d3.select("body").append("div")
            .attr("class", "tooltip");

        const totalPopulation = d3.sum(data, d => +d.population);

        const pie = d3.pie()
            .value(d => +d.population)
            .sort(null);

        const data_ready = pie(data);

        const radiusScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => +d.population)])
            .range([0, radius]);

        const color = d3.scaleOrdinal()
            .domain(data.map(d => d.religion))
            .range(d3.schemeCategory10);

        const arc = d3.arc()
            .innerRadius(0)
            .outerRadius(d => radiusScale(d.data.population));

        svg.selectAll('path')
            .data(data_ready)
            .enter()
            .append('path')
            .attr('class', 'arc')
            .attr('d', arc)
            .attr('fill', d => color(d.data.religion))
            .attr('stroke', 'white')
            .style('stroke-width', '2px')
            .style('opacity', 0.7)
            .on('mouseover', function (event, d) {
                d3.select(this).style("opacity", 1);
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                tooltip.html(`Religion: ${d.data.religion}<br>Population: ${(+d.data.population).toLocaleString()}`)
                    .style("left", (event.pageX + 5) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on('mouseout', function (event, d) {
                d3.select(this).style("opacity", 0.7);
                tooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
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

        const legend = svg.append("g")
            .attr("class", "legend")
            .attr("transform", `translate(${width / 2 - margin}, -${height / 2 - margin})`);

        legend.selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('x', 80)
            .attr('y', (d, i) => i * 25)
            .attr('width', 20)
            .attr('height', 20)
            .attr('fill', d => color(d.religion));

        legend.selectAll('text')
            .data(data)
            .enter()
            .append('text')
            .attr('x', 120)
            .attr('y', (d, i) => i * 25 + 15)
            .text(d => `${d.religion}: ${(+d.population).toLocaleString()}`);
    });
 
