
       

            d3.csv("sport.csv").then(data => {data.forEach(d => {
                d.titles_won = +d.titles_won;
            });
                const margin = {top: 20, right: 30, bottom: 40, left: 40},
                      width = 800 - margin.left - margin.right,
                      height = 400 - margin.top - margin.bottom;
             
                const svg = d3.select("#bar-chart").append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", `translate(${margin.left},${margin.top})`);
             
                // Background
                svg.append("rect")
                    .attr("width", width)
                    .attr("height", height)
                    .attr("fill", "#f0f0f0");
             
            // X axis
            const x = d3.scaleBand()
                .domain(data.map(d => d.player))
                .range([0, width])
                .padding(0.1);

            svg.append("g")
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(x))
                .selectAll("text")
                .attr("class", "axis-label")
                .attr("transform", "rotate(-45)")
                .attr("text-anchor", "end");

            // Y axis
            const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.titles_won)])
                .nice()
                .range([height, 0]);

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
                .attr("x", d => x(d.player))
                .attr("y", height)  // Start at bottom for transition
                .attr("width", x.bandwidth())
                .attr("height", 0)  // Start height at 0 for transition
                .attr("fill", (d, i) => d3.schemeCategory10[i % 10])
                .on('mouseover', function (event, d) {
                    d3.select(this).style("fill-opacity", 1);
                    showInfo(d);
                })
                .on('mouseout', function () {
                    d3.select(this).style("fill-opacity", 0.7);
                    hideInfo();
                })
                .transition()
                .duration(800)
                .attr("y", d => y(d.titles_won))
                .attr("height", d => height - y(d.titles_won));

            // Add right side information within the same SVG
            const infoBox = svg.append("g")
                .attr("class", "info-box")
                .attr("transform", `translate(${width + 20}, 0)`)
                .style("display", "none");

            infoBox.append("text")
                .attr("class", "player")
                .style("fill", "#f2f2f2");

            infoBox.append("text")
                .attr("class", "sport")
                .style("fill", "#f2f2f2")
                .attr("y", 20);

            infoBox.append("text")
                .attr("class", "country")
                .style("fill", "#f2f2f2")
                .attr("y", 40);

            infoBox.append("text")
                .attr("class", "titles-won")
                .style("fill", "#f2f2f2")
                .attr("y", 60);

            infoBox.append("text")
                .attr("class", "years-active")
                .style("fill", "#f2f2f2")
                .attr("y", 80);

            infoBox.append("text")
                .attr("class", "notable-achievement")
                .style("fill", "#f2f2f2")
                .attr("y", 100);

            function showInfo(d) {
                infoBox.style("display", null);
                infoBox.select(".player").text(`Player: ${d.player}`);
                infoBox.select(".sport").text(`Sport: ${d.sport}`);
                infoBox.select(".country").text(`Country: ${d.country}`);
                infoBox.select(".titles-won").text(`Titles Won: ${d.titles_won}`);
                infoBox.select(".years-active").text(`Years Active: ${d.years_active}`);
                infoBox.select(".notable-achievement").text(`Notable Achievement: ${d.notable_achievement}`);
            }

            function hideInfo() {
                infoBox.style("display", "none");
            }

            // Add CSS styling for interactive design
            d3.select("body").append("style").html(`
                .bar {
                    transition: fill-opacity 0.2s;
                }
                .bar:hover {
                    fill-opacity: 1;
                }
                .axis-label {
                    font-size: 14px;
                    fill: #333;
                }
                .info-box text {
                    font-size: 14px;
                }
                .info-box tspan {
                    font-size: 12px;
                }
            `);
        });